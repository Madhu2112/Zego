import React, { useCallback, useEffect, useState } from 'react'
import Quill from "quill";
import "quill/dist/quill.snow.css";
import io from 'socket.io-client';
import { useParams } from 'react-router-dom';


const toolBarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],
  [{ list: "ordered" }, { list: "bullet" }],
  ["bold", "italic", "underline"],
  [{ color: [] }, { background: [] }],
  [{ script: "sub" }, { script: "super" }],
  [{ align: [] }],
  ["image", "blockquote", "code-block"],
  ["clean"],
]

export default function TextEditor(props) {
  // const { id } = useParams();
  const id = props.roomId;
  const [socket, setSocket] = useState(null);
  const [quill, setQuill] = useState(null);

  //socket connection
  useEffect(() => {
    const s = io("http://localhost:3001");
    setSocket(s);
    return () => {
      s.disconnect();
    }
  }, [])

  //loading doucement data from db if exists or create a new one
  useEffect(() => {
    if (socket == null || quill == null) return

    socket.on("load-document", document => {
      quill.setContents(document)
      quill.enable()
    })
    socket.emit("get-document", id)
  }, [socket, quill, id])

  // send changes
  useEffect(() => {
    if (socket === null || quill === null) {
      return;
    }
    let handleTextChange = (delta, oldDelta, source) => {
      if (source !== 'user') {
        return;
      }
      socket.emit('send-changes', delta);
    }
    quill.on('text-change', handleTextChange);

    return () => {
      quill.off('text-change', handleTextChange);
    }
  }, [socket, quill])

  //receive and update changes
  useEffect(() => {
    if (socket === null || quill === null) {
      return;
    }
    let handleTextChange = (delta) => {
      quill.updateContents(delta);
    }
    socket.on('receive-changes', handleTextChange);

    return () => {
      socket.off('receive-changes', handleTextChange);
    }
  }, [socket, quill])

  //saving the document data for every 2sec
  useEffect(() => {
    if (socket === null || quill === null) return

    const interval = setInterval(() => {
      socket.emit('save-document', quill.getContents());
    }, 2000)

    return () => {
      clearInterval(interval);
    }
  }, [socket, quill,])

  //wrapping the document toolbar inside the container div
  const wrapperRef = useCallback((wrapper) => {
    if (wrapper === null) {
      return;
    }
    wrapper.innerHTML = "";
    const editor = document.createElement("div");
    wrapper.append(editor);
    const q = new Quill(editor, { theme: "snow", modules: { toolbar: toolBarOptions } })
    q.disable();
    q.setText("Loading..")
    setQuill(q);
  }, [])


  return (
    <>
      <div className='container' ref={wrapperRef}>
      </div>
    </>

  )
}