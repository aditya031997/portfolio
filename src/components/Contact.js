import React, { useState } from 'react';
import './Contact.css';
import { FiMail, FiPhone, FiMapPin, FiLinkedin, FiExternalLink } from 'react-icons/fi';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');
    const [submitError, setSubmitError] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({});

    const web3formsKey = process.env.REACT_APP_WEB3FORMS_ACCESS_KEY;

    const contactEmail = 'singhaditya4743@gmail.com';
    const contactPhoneDisplay = '+91 8146724743';
    const linkedInUrl = 'https://linkedin.com/in/aditya-singh8146';
    const linkedInDisplay = 'linkedin.com/in/aditya-singh8146';

    const validateForm = () => {
        const errors = {};
        const name = formData.name.trim();
        const email = formData.email.trim();
        const subject = formData.subject.trim();
        const message = formData.message.trim();

        if (!name) {
            errors.name = 'Name is required';
        } else if (name.length < 2) {
            errors.name = 'Name must be at least 2 characters';
        }

        if (!email) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            errors.email = 'Please enter a valid email address';
        }

        if (!subject) {
            errors.subject = 'Subject is required';
        } else if (subject.length < 3) {
            errors.subject = 'Subject must be at least 3 characters';
        }

        if (!message) {
            errors.message = 'Message is required';
        } else if (message.length < 10) {
            errors.message = 'Message must be at least 10 characters';
        }

        return errors;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (fieldErrors[name]) {
            setFieldErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitMessage('');
        setSubmitError(false);

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            setSubmitError(true);
            setSubmitMessage('Please fill in all required fields correctly.');
            return;
        }

        setFieldErrors({});
        setIsSubmitting(true);

        if (!web3formsKey) {
            setSubmitError(true);
            setSubmitMessage(
                'Web3Forms is not configured yet. Add REACT_APP_WEB3FORMS_ACCESS_KEY to your .env file (see .env.example).'
            );
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    access_key: web3formsKey,
                    name: formData.name.trim(),
                    email: formData.email.trim(),
                    subject: formData.subject.trim(),
                    message: formData.message.trim(),
                    from_name: formData.name.trim(),
                    botcheck: '',
                }),
            });

            const result = await response.json();

            if (result.success) {
                setSubmitError(false);
                setSubmitMessage('Thank you! Your message was sent successfully. I\'ll get back to you soon.');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setFieldErrors({});
            } else {
                setSubmitError(true);
                setSubmitMessage(result.message || 'Something went wrong. Please try again.');
            }
        } catch {
            setSubmitError(true);
            setSubmitMessage('Could not send your message. Check your connection and try again.');
        } finally {
            setIsSubmitting(false);
            setTimeout(() => setSubmitMessage(''), 8000);
        }
    };

    const contactDetails = [
        { icon: <FiMail />, label: 'Email', value: contactEmail },
        { icon: <FiPhone />, label: 'Phone', value: contactPhoneDisplay },
        { icon: <FiMapPin />, label: 'Location', value: 'Mohali, India' },
    ];

    return (
        <section id="contact" className="contact">
            <div className="contact-container">
                <div className="contact-header">
                    <h2 className="section-title">Get In Touch</h2>
                    <div className="title-underline"></div>
                    <p className="section-subtitle">
                        Have a project in mind or want to collaborate? I'd love to hear from you!
                    </p>
                </div>

                <div className="contact-content">
                    <div className="contact-info">
                        <h3>Let's Connect</h3>
                        <p>
                            I'm always interested in new opportunities, commercial projects, and innovative startups.
                            Use the form to reach me, or connect on LinkedIn.
                        </p>

                        <div className="contact-details-panel">
                            <p className="contact-details-heading">My details</p>
                            <div className="contact-details-grid">
                                {contactDetails.map((item, index) => (
                                    <div key={index} className="contact-detail-card">
                                        <div className="contact-detail-icon">{item.icon}</div>
                                        <div className="contact-detail-text">
                                            <span className="contact-detail-label">{item.label}</span>
                                            <span className="contact-detail-value">{item.value}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <a
                            href={linkedInUrl}
                            className="contact-linkedin-card"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Open LinkedIn profile: ${linkedInDisplay}`}
                        >
                            <div className="contact-linkedin-icon">
                                <FiLinkedin />
                            </div>
                            <div className="contact-linkedin-body">
                                <span className="contact-linkedin-label">Connect on LinkedIn</span>
                                <span className="contact-linkedin-url">{linkedInDisplay}</span>
                            </div>
                            <span className="contact-linkedin-arrow" aria-hidden="true">
                                <FiExternalLink />
                            </span>
                        </a>
                    </div>

                    <div className="contact-form-wrapper">
                        <h3>Send Me a Message</h3>

                        {submitMessage && (
                            <div className={submitError ? 'error-message' : 'success-message'}>
                                {submitMessage}
                            </div>
                        )}

                        <form className="contact-form" onSubmit={handleSubmit} noValidate>
                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Your Name *"
                                        className={fieldErrors.name ? 'input-error' : ''}
                                        aria-invalid={!!fieldErrors.name}
                                        aria-describedby={fieldErrors.name ? 'name-error' : undefined}
                                    />
                                    {fieldErrors.name && (
                                        <span id="name-error" className="field-error">{fieldErrors.name}</span>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Your Email *"
                                        className={fieldErrors.email ? 'input-error' : ''}
                                        aria-invalid={!!fieldErrors.email}
                                        aria-describedby={fieldErrors.email ? 'email-error' : undefined}
                                    />
                                    {fieldErrors.email && (
                                        <span id="email-error" className="field-error">{fieldErrors.email}</span>
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    placeholder="Subject *"
                                    className={fieldErrors.subject ? 'input-error' : ''}
                                    aria-invalid={!!fieldErrors.subject}
                                    aria-describedby={fieldErrors.subject ? 'subject-error' : undefined}
                                />
                                {fieldErrors.subject && (
                                    <span id="subject-error" className="field-error">{fieldErrors.subject}</span>
                                )}
                            </div>

                            <div className="form-group">
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Your Message *"
                                    rows="6"
                                    className={fieldErrors.message ? 'input-error' : ''}
                                    aria-invalid={!!fieldErrors.message}
                                    aria-describedby={fieldErrors.message ? 'message-error' : undefined}
                                ></textarea>
                                {fieldErrors.message && (
                                    <span id="message-error" className="field-error">{fieldErrors.message}</span>
                                )}
                            </div>

                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Sending...' : 'Send Message'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
