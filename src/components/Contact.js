import React, { useState } from 'react';
import './Contact.css';
import { FiMail, FiPhone, FiMapPin, FiLinkedin } from "react-icons/fi";

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitMessage, setSubmitMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        setTimeout(() => {
            setIsSubmitting(false);
            setSubmitMessage('Thank you for your message! I\'ll get back to you soon.');
            setFormData({ name: '', email: '', subject: '', message: '' });

            // Clear success message after 5 seconds
            setTimeout(() => setSubmitMessage(''), 5000);
        }, 2000);
    };
    const contactInfo = [
        {
            icon: <FiMail />,
            title: 'Email',
            details: 'singhaditya4743@gmail.com',
            link: '' // not clickable
        },
        {
            icon: <FiPhone />,
            title: 'Phone',
            details: '+91 8146724743',
            link: '' // not clickable
        },
        {
            icon: <FiMapPin />,
            title: 'Location',
            details: 'Mohali, India',
            link: '' // not clickable
        },
        {
            icon: <FiLinkedin />,
            title: 'LinkedIn',
            details: 'linkedin.com/in/yourprofile',
            link: 'https://linkedin.com/in/yourprofile'
        }
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
                    {/* Contact Information */}
                    <div className="contact-info">
                        <h3>Let's Connect</h3>
                        <p>
                            I'm always interested in new opportunities and exciting projects.
                            Whether you have a question or just want to say hi, feel free to reach out!
                        </p>

                        <div className="contact-details">
                            {contactInfo.map((item, index) => (
                                item.title === 'LinkedIn' ? (
                                    <a
                                        key={index}
                                        href={item.link}
                                        className="contact-item"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <div className="contact-icon">{item.icon}</div>
                                        <div className="contact-text">
                                            <h4>{item.title}</h4>
                                            <p>{item.details}</p>
                                        </div>
                                    </a>
                                ) : (
                                    <div key={index} className="contact-item">
                                        <div className="contact-icon">{item.icon}</div>
                                        <div className="contact-text">
                                            <h4>{item.title}</h4>
                                            <p>{item.details}</p>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>


                    </div>

                    {/* Contact Form */}
                    <div className="contact-form-wrapper">
                        <h3>Send Me a Message</h3>

                        {submitMessage && (
                            <div className="success-message">
                                {submitMessage}
                            </div>
                        )}

                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Your Name"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="Your Email"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    placeholder="Subject"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Your Message"
                                    rows="6"
                                    required
                                ></textarea>
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
