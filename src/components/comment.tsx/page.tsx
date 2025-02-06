// src\components\comments.tsx
'use client'

import { useEffect, useState } from 'react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { X } from 'lucide-react'

import { createComment, deleteComment, myFetch, updateComment } from '@/services/commentCreate'
import { toast } from 'sonner'
import ReviewCard from '../ReviewCard.tsx/page'

export interface Comment { _id: string,  name: string; email: string; message: string, paramsId: number }

export default function PostCreator({ blog_id }: { blog_id: string }) {

  const [name, SetName] = useState("")
  const [email, SetEmail] = useState("")
  const [message, SetMessage] = useState("")

  const [cmtArray, setCmtArray] = useState<Comment[]>([])
  const [btnName, setBtnName] = useState("Post")
  const [findCard, setFindCard] = useState<Comment | null>(null)

  // ------------------------------------------------create 
  const postComment = async () => {
    const cardFound = cmtArray.find((comment) => comment._id === findCard?._id);

    if (cardFound) {
      const UpdatedComment = { name, email, message, paramsId: String(blog_id) };
      const res = await updateComment(cardFound._id, UpdatedComment)
      setCmtArray(res);
      SetName('');
      SetEmail('');
      SetMessage('');
      handleClose();
      setBtnName('Post')
      setFindCard(null)
      toast.success('Comment updated successfully', {
        className: 'text-lg',
        style: { fontSize: '18px' },
      });

    }
    
    else if (name && email && message && !cardFound) {
      const newComment = { name, email, message, paramsId: String(blog_id) };
      try {
        const res = await createComment(newComment);
        setCmtArray(res);
        SetName('');
        SetEmail('');
        SetMessage('');
        handleClose();
        toast.success('Comment posted successfully', {
          className: 'text-lg',
          style: { fontSize: '18px' },
        });
        
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    } else {
      toast.warning('Please fill all the fields', {
        className: 'text-lg',
        style: { fontSize: '18px' },
      });
    }
  };

  // ------------------------------------------------fetch
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comments = await myFetch(blog_id);
        setCmtArray(comments);
        
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  },[blog_id]);

  // ------------------------------------------------set update input fields
  const setUpdateInputFields = (data: Comment) => {
    setIsExpanded(true);
    SetName(data.name);
    SetEmail(data.email);
    SetMessage(data.message);
    setBtnName('Update')
    setFindCard(data)
  }

  // ------------------------------------------------Delete
  const deleteFunction = async (_id: string) => {
    const res = await deleteComment(_id, blog_id);
    setCmtArray(res);
    toast.success('Comment deleted successfully', {
      className: 'text-lg',
      style: { fontSize: '18px' },
    });
  }

  const [isExpanded, setIsExpanded] = useState(false)

  const handleClose = () => {
    setIsExpanded(false)
  }

  return (
    <div className="w-full p-8 bg-gradient-to-r from-[#F1F5F9] via-[#D1D9E6] to-[#F1F3F5] rounded-xl shadow-lg border border-[#C4D0D7] mb-[100px] mt-[40px]">
      {!isExpanded ? (
        <div className="flex items-center gap-4 p-4 bg-white border rounded-lg shadow-md hover:bg-[#e7f1f7] transition-colors">
          <Avatar className="h-[65px] w-[65px] border-2 border-[#A1B1C0]">
            <AvatarImage src="/placeholder.svg" alt="User avatar" />
            <AvatarFallback className="text-lg font-bold">U</AvatarFallback>
          </Avatar>
          <button
            onClick={() => setIsExpanded(true)}
            className="flex-1 h-16 px-5 text-left text-[#5A5F69] font-semibold bg-[#F3F4F6] border border-[#B0C0D5] rounded-[30px] hover:bg-[#D1D8E4] transition-all"
          >
            Add your comments here...
          </button>
        </div>
      ) : (
        <div className="space-y-6 bg-[#F7FAFC] p-5 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-[65px] w-[65px] border-2 border-[#A1B1C0]">
                <AvatarImage src="/icon.png" alt="User avatar" />
                <AvatarFallback>User</AvatarFallback>
              </Avatar>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClose}
              className="h-10 w-10 bg-[#F5F7F9] hover:bg-[#E0E4E9] transition-all"
            >
              <X className="h-10 w-12 text-[24px] text-black" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Label htmlFor="firstName" className="text-sm font-medium text-[#5A5F69]">First Name</Label>
              <Input
                id="firstName"
                placeholder="Enter your first name"
                className="bg-[#F3F4F6] border-[#D1D9E6] rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                value={name}
                onChange={(e) => SetName(e.target.value)}
              />
            </div>
            <div className="space-y-3">
              <Label htmlFor="email" className="text-sm font-medium text-[#5A5F69]">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                className="bg-[#F3F4F6] border-[#D1D9E6] rounded-lg focus:ring-2 focus:ring-primary focus:outline-none"
                value={email}
                onChange={(e) => SetEmail(e.target.value)}
              />
            </div>
          </div>

          <Textarea
            placeholder="Write your post or question here"
            className="min-h-[250px] bg-[#F3F4F6] border-[#D1D9E6] rounded-lg resize-none focus:ring-2 focus:ring-primary"
            value={message}
            onChange={(e) => SetMessage(e.target.value)}
          />
          <div className="flex justify-end">
            <Button className="w-[165px] py-3 text-lg bg-[#4C9F70] hover:bg-[#3C8B5C] text-white rounded-lg transition-all" onClick={postComment}>{btnName}</Button>
          </div>
        </div>
      )}

      <hr className='my-6 border-[#D1D9E6]' />
      {cmtArray.map((comment: Comment, index: number) => (
         <ReviewCard
         data={comment}
         key={index}
         setUpdateInputFields={setUpdateInputFields}
         deleteFunction={deleteFunction}
       />
      ))}
    </div>
  )
}












// "use client";

// import React, { useState, useEffect } from "react";
// import Image from "next/image";

// type Comment = {
//   id: number;
//   text: string;
// };

// const CommentSection: React.FC = () => {
//   const [comments, setComments] = useState<Comment[]>([]);
//   const [newComment, setNewComment] = useState<string>("");

//   const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
//   const [editingText, setEditingText] = useState<string>("");

//   useEffect(() => {
//     const savedComments = localStorage.getItem("comments");
//     if (savedComments) {
//       setComments(JSON.parse(savedComments));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("comments", JSON.stringify(comments));
//   }, [comments]);

//   const handleAddComment = () => {
//     if (newComment.trim()) {
//       const newCommentObject = { id: Date.now(), text: newComment.trim() };
//       setComments([...comments, newCommentObject]);
//       setNewComment("");
//     }
//   };

//   const handleDeleteComment = (id: number) => {
//     const updatedComments = comments.filter((comment) => comment.id !== id);
//     setComments(updatedComments);
//   };

//   const handleEditComment = (id: number, text: string) => {
//     setEditingCommentId(id);
//     setEditingText(text);
//   };

//   const handleSaveEdit = () => {
//     setComments(
//       comments.map((comment) =>
//         comment.id === editingCommentId
//           ? { ...comment, text: editingText.trim() }
//           : comment
//       )
//     );
//     setEditingCommentId(null);
//     setEditingText("");
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 bg-white shadow-2xl rounded-lg mt-10 w-full mb-8">
//       <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 text-center">
//         Comment Section
//       </h2>

//       <div className="flex flex-wrap gap-4 mb-6">
//         <input
//           type="text"
//           value={newComment}
//           onChange={(e) => setNewComment(e.target.value)}
//           placeholder="Write your comment here..."
//           className="flex-1 w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
//         />
//         <button
//           onClick={handleAddComment}
//           className="bg-blue-500 w-full sm:w-auto text-white px-6 py-3 text-base rounded-lg hover:bg-blue-600 transition shadow-md"
//         >
//           Add
//         </button>
//       </div>

//       <div className="space-y-6">
//         {comments.map((comment) => (
//           <div
//             key={comment.id}
//             className="border border-gray-300 rounded-lg p-4 flex flex-wrap items-start justify-between shadow-lg hover:shadow-2xl transition"
//           >
//             <div className="flex items-center gap-4 flex-1 w-full sm:w-auto">
//               <Image
//                 src="/icon.png"
//                 alt="Profile"
//                 width={48}
//                 height={40}
//                 className="rounded-full"
//               />
//               {editingCommentId === comment.id ? (
//                 <input
//                   type="text"
//                   value={editingText}
//                   onChange={(e) => setEditingText(e.target.value)}
//                   className="w-full border border-gray-300 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 />
//               ) : (
//                 <p className="text-gray-900 text-lg">{comment.text}</p>
//               )}
//             </div>

//             <div className="flex gap-2 w-full sm:w-auto mt-4 sm:mt-0 flex-wrap">
//               {editingCommentId === comment.id ? (
//                 <>
//                   <button
//                     onClick={handleSaveEdit}
//                     className="bg-green-500 text-white px-4 py-2 text-sm rounded-lg hover:bg-green-600 transition shadow-sm w-20 sm:w-auto lg:ml-10"
//                   >
//                     Save
//                   </button>
//                   <button
//                     onClick={() => setEditingCommentId(null)}
//                     className="bg-gray-400 text-white px-4 py-2 text-sm rounded-lg hover:bg-gray-500 transition shadow-sm w-20 sm:w-auto"
//                   >
//                     Cancel
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <button
//                     onClick={() => handleEditComment(comment.id, comment.text)}
//                     className="bg-yellow-500 text-white px-4 py-2 text-sm rounded-lg hover:bg-yellow-600 transition shadow-sm w-20 sm:w-auto"
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDeleteComment(comment.id)}
//                     className="bg-red-500 text-white px-4 py-2 text-sm rounded-lg hover:bg-red-600 transition shadow-sm w-20 sm:w-auto"
//                   >
//                     Delete
//                   </button>
//                 </>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CommentSection;









