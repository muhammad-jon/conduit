import React, { useState } from "react";
import ListErrors from "./ListErrors";
import agent from "../agent";
import {
  ADD_TAG,
  EDITOR_PAGE_LOADED,
  EDITOR_PAGE_UNLOADED,
  REMOVE_TAG,
  ARTICLE_SUBMITTED,
  UPDATE_FIELD_EDITOR,
} from "../constants/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const Editor = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const editorState = useSelector((state) => state.editor);

  const updateFieldEvent =(key)=> e => dispatch({
    type: UPDATE_FIELD_EDITOR, key, value: e.target.value
  })
  const changeTitle = updateFieldEvent('title')
  const changeDescription= updateFieldEvent('description')
  const changeBody = updateFieldEvent('body')
  const changeTagInput = updateFieldEvent('tagInput')

  const watchForEnter = e=>{
    if(e.keyCode === 13){
      e.preventDefault();
      dispatch({type: ADD_TAG})
    }
  }

  

  React.useEffect(() => {
    if (params.slug) {
      dispatch({
        type: EDITOR_PAGE_LOADED,
        payload: agent.Articles.get(params.slug),
      });
    }
    return () => {
      dispatch({ type: EDITOR_PAGE_UNLOADED });
    };
  }, []);



  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <ListErrors errors={editorState.errors} />
            <form>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    value={editorState.title}
                    onChange={}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="What's this article about?"
                    value={editorState.description}
                    onChange={}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows="8"
                    placeholder="Write your article (in markdown)"
                    value={editorState.body}
                    onChange={}
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter tags"
                    value={editorState.tagInput}
                    onChange={}
                    onKeyUp={}
                  />
                  <div className="tag-list"></div>
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  disabled={editorState.inProgress}
                  onClick={submitForm}
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
