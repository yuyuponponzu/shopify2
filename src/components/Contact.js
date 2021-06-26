import React from 'react';
import HamburgerMenu from '../atoms/organisms/hamburgermenu';

class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isSubmitted: false,
            name: '',
            hasNameError: false,
            email: '',
            hasEmailError: false,
            /* contentとhasContentErrorというstateを追加 */
            content: '',
            hasContentError: false,
        };
    }

    handleNameChange(event) {
        const inputValue = event.target.value;
        const isEmpty = inputValue === '';
        this.setState({
            name: inputValue,
            hasNameError: isEmpty,
        });
    }

    handleEmailChange(event) {
        const inputValue = event.target.value;
        const isEmpty = inputValue === '';
        this.setState({
            email: inputValue,
            hasEmailError: isEmpty,
        });
    }

    handleContentChange(event) {
        const inputValue = event.target.value;
        const isEmpty = inputValue === '';
        this.setState({
            content: inputValue,
            hasContentError: isEmpty,
        });
    }

    handleSubmit() {
        this.setState({ isSubmitted: true });
    }

    render() {
        let nameErrorText;
        if (this.state.hasNameError) {
            nameErrorText = <p className="contact-message-error">名前を入力してください</p>;
        }

        let emailErrorText;
        if (this.state.hasEmailError) {
            emailErrorText = (
                <p className="contact-message-error">メールアドレスを入力してください</p>
            );
        }

        let contentErrorText;

        /* hasContentErrorを条件にしたif文を作成 */
        if (this.state.hasContentError) {
            contentErrorText = (
                <p className="contact-message-error">メッセージを入力してください</p>
            );
        }

        let contactForm;
        if (this.state.isSubmitted) {
            contactForm = <div className="contact-submit-message">Message sent!</div>;
        } else {
            contactForm = (
                <form
                    onSubmit={() => {
                        this.handleSubmit();
                    }}
                >
                    <p>Name</p>
                    <input
                        value={this.state.name}
                        onChange={(event) => {
                            this.handleNameChange(event);
                        }}
                    />
                    {nameErrorText}
                    <p>e-mail</p>
                    <input
                        value={this.state.email}
                        onChange={(event) => {
                            this.handleEmailChange(event);
                        }}
                    />
                    {emailErrorText}
                    <p>Message</p>
                    {/* stateのvalueの値と、onChangeイベントを追加 */}
                    <textarea
                        value={this.state.content}
                        onChange={(event) => {
                            this.handleContentChange(event);
                        }}
                    />
                    {/* contentErrorTextを表示*/}
                    {contentErrorText}

                    <input type="submit" value="Send" />
                </form>
            );
        }

        return (
            <>
                <div className="Header">
                    <HamburgerMenu />
                    <div className="title_text">itone</div>
                </div>
                <div className="contact-form">{contactForm}</div>
            </>
        );
    }
}

export default ContactForm;
