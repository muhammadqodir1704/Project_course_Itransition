import { useContext, useState } from "react";
import { FormContext } from "../context/FormContext";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegCopy, FaRegHeart, FaHeart, FaRegComment } from "react-icons/fa";

const Dashboard = () => {
  const {
    formName,
    setFormName,
    formDescription,
    setFormDescription,
    questions,
    setQuestions,
    addQuestion,
    addOption,
    handleOptionChange,
    handleQuestionChange,
    removeOption,
    removeQuestion,
    saveForm,
  } = useContext(FormContext);

  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState(new Set());
  const [showComments, setShowComments] = useState({});
  const [newComment, setNewComment] = useState("");

  const validateAndSaveForm = () => {
    if (!formName.trim()) {
      alert("Form name is required!");
      return;
    }

    const invalidQuestion = questions.find(
      (question) => !question.text.trim() || question.options.some(option => !option.trim())
    );
    if (invalidQuestion) {
      alert("Each question and option must have text.");
      return;
    }

    console.log("Form is valid, saving...");
    saveForm();
  };

  const toggleComments = (qIndex) => {
    setShowComments(prev => ({
      ...prev,
      [qIndex]: !prev[qIndex]
    }));
  };

  return (
    <div className="max-w-2xl mx-auto mt-6 bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Create a New Form</h2>
        <input
          type="text"
          placeholder="Enter form title..."
          value={formName}
          onChange={(e) => setFormName(e.target.value)}
          className="border-b-2 focus:outline-none w-full mb-4 text-xl font-semibold"
        />
        <input
          type="text"
          placeholder="Enter form description..."
          value={formDescription}
          onChange={(e) => setFormDescription(e.target.value)}
          className="border-b-2 focus:outline-none w-full mb-4 text-gray-600"
        />
        {questions.map((question, qIndex) => (
          <div key={qIndex} className="mb-6 p-4 bg-gray-100 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">Question {qIndex + 1}</h3>
              <select
                value={question.type || 'text'}
                onChange={(e) => {
                  const updatedQuestions = [...questions];
                  updatedQuestions[qIndex].type = e.target.value;
                  setQuestions(updatedQuestions);
                }}
                className="border rounded px-2 py-1 ml-2"
              >
                <option value="text">Single-line Text</option>
                <option value="textarea">Multi-line Text</option>
                <option value="number">Positive Integer</option>
                <option value="checkbox">Checkbox</option>
              </select>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-center bg-transparent px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm">
                    <PiDotsThreeOutlineVerticalFill aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                  </MenuButton>
                </div>
                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-56 origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none"
                >
                  <div className="py-1">
                    <MenuItem onClick={() => removeQuestion(qIndex)}>
                      <a href="#" className="px-4 py-2 text-sm text-gray-700 flex items-center">
                        <MdDeleteOutline size={18} className="mr-2" />
                        Remove
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a href="#" className="px-4 py-2 text-sm text-gray-700 flex items-center">
                        <FaRegCopy size={18} className="mr-2" />
                        Duplicate item
                      </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </div>

            <input
              type="text"
              placeholder={`Enter question ${qIndex + 1}...`}
              value={question.text || ""}
              onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
              className="border-b-2 focus:outline-none w-full mb-4 text-gray-800"
            />

            <input
              type="text"
              placeholder="Enter image URL..."
              value={question.image || ""}
              onChange={(e) => {
                const updatedQuestions = [...questions];
                updatedQuestions[qIndex].image = e.target.value;
                setQuestions(updatedQuestions);
              }}
              className="border px-4 py-2 rounded w-full mb-4"
            />

            {question.image && (
              <img
                src={question.image}
                alt={`Question ${qIndex + 1}`}
                className="w-full h-32 object-cover mb-4 rounded"
              />
            )}

            {question.type === 'text' && (
              <input
                type="text"
                placeholder="Single line answer"
                className="border px-4 py-2 rounded w-full mb-4"
                disabled
              />
            )}

            {question.type === 'textarea' && (
              <textarea
                placeholder="Multi line answer"
                className="border px-4 py-2 rounded w-full h-24 mb-4"
                disabled
              />
            )}

            {question.type === 'number' && (
              <input
                type="number"
                min="0"
                placeholder="Enter positive number"
                className="border px-4 py-2 rounded w-full mb-4"
                disabled
              />
            )}

            {question.type === 'checkbox' && (
              <div className="flex items-center mb-4">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600"
                  disabled
                />
                <span className="ml-2">Check this option</span>
              </div>
            )}

            <div className="space-y-2">
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center">
                  <input
                    type="text"
                    placeholder={`Option ${oIndex + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                    className="border px-4 py-2 rounded flex-1"
                  />
                  <button
                    className="text-gray-400 ml-2"
                    onClick={() => removeOption(qIndex, oIndex)}
                  >
                    ✕
                  </button>
                </div>
              ))}
              <button
                onClick={() => addOption(qIndex)}
                className="text-blue-500 text-sm"
              >
                + Add Option
              </button>
            </div>

            <div className="mt-4 border-t pt-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    const newLikes = new Set(likes);
                    if (newLikes.has(qIndex)) {
                      newLikes.delete(qIndex);
                    } else {
                      newLikes.add(qIndex);
                    }
                    setLikes(newLikes);
                  }}
                  className="flex items-center space-x-1 text-gray-600 hover:text-red-500"
                >
                  {likes.has(qIndex) ? (
                    <FaHeart className="text-red-500" />
                  ) : (
                    <FaRegHeart />
                  )}
                  <span>{likes.has(qIndex) ? 1 : 0}</span>
                </button>

                <button
                  onClick={() => toggleComments(qIndex)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-500"
                >
                  <FaRegComment />
                  <span>{comments.filter(c => c.questionId === qIndex).length}</span>
                </button>
              </div>

              {showComments[qIndex] && (
                <div className="mt-4 space-y-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="flex-1 border rounded-lg px-4 py-2"
                    />
                    <button
                      onClick={() => {
                        if (newComment.trim()) {
                          setComments([
                            ...comments,
                            {
                              id: Date.now(),
                              questionId: qIndex,
                              text: newComment,
                              timestamp: new Date().toISOString()
                            }
                          ]);
                          setNewComment("");
                        }
                      }}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    >
                      Post
                    </button>
                  </div>

                  {comments
                    .filter(c => c.questionId === qIndex)
                    .map(comment => (
                      <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                        <p className="text-gray-800">{comment.text}</p>
                        <span className="text-sm text-gray-500">
                          {new Date(comment.timestamp).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <button
          onClick={addQuestion}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Add Question
        </button>
        <button
          onClick={validateAndSaveForm}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Save Form
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
