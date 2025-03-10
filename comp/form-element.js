import { html, LitElement } from "lit";

export class FromElement extends LitElement {
    static properties = {};

    static styles = css`
        
    `;

    constructor() {
        super();
    }

    render() {
        return html`
            <form id="submission-form">
                <label for="name">Name:</label>
                <input type="text" id="name" name="name">

                <label for="name">Name:</label>
                <input type="radio" id="content_type_video" name="content_type" value="video">
                <label for="content_type_video">Video</label>
                <input type="radio" id="content_type_article" name="content_type" value="article" checked>
                <label for="content_type_article">Article</label>

                <label for="">Name:</label>
                <input type="text" id="name" name="name">

                <label for="name">Name:</label>
                <input type="text" id="name" name="name">

                <label for="name">Name:</label>
                <input type="text" id="name" name="name">

                <button type="submit">Submit</button>
            </form>
        `;
    }
}