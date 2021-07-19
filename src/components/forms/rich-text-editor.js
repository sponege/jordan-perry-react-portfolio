import React, { Component } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg"; // what you see is what you get
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";

export default class RichTextEditor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
    };

    this.onEditorStateChange = (editorState) => {
      this.setState(
        { editorState },
        this.props.handleRichTextEditorChange(
          draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        )
      );
    };

    this.getBase64 = (file, callback) => {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => callback(reader.result);
      reader.onerror = (error) => {};
    };

    this.uploadFile = (file) => {
      return new Promise((resolve, reject) => {
        this.getBase64(file, (data) => resolve({ data: { link: data } }));
      });
    };
  }

  componentWillMount() {
    if (this.props.editMode && this.props.contentToEdit) {
      const blocksFromHtml = htmlToDraft(this.props.contentToEdit);
      const { contentBlocks, entityMap } = blocksFromHtml;
      const contentState = ContentState.createFromBlockArray(
        contentBlocks,
        entityMap
      );
      const editorState = EditorState.createWithContent(contentState);
      this.setState({ editorState });
    }
  }

  render() {
    return (
      <div>
        <Editor
          editorState={this.state.editorState}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          onEditorStateChange={this.onEditorStateChange}
          toolbar={{
            inline: { inDropdown: true },
            list: { inDropdown: true },
            textAlign: { inDropdown: true },
            link: { inDropdown: true },
            history: { inDropdown: true },
            image: {
              uploadCallback: this.uploadFile,
              alt: { present: true, mandatory: false },
              previewImage: true,
              inputAccept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
            },
          }}
        />
      </div>
    );
  }
}
