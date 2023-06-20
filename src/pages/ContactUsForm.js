import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const ContactUsForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("* Name is required"),
      email: Yup.string()
        .email("* Invalid email address")
        .required("* Email is required"),
      phone: Yup.string().required("* Phone is required"),
      message: Yup.string().required("* Message is required"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setIsSubmitting(true);

        const response = await fetch("http://localhost:8000/contact-us", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          toast.success("Form submitted successfully");
          resetForm();
        } else {
          toast.error("Failed to submit form");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
        toast.error("Error submitting form");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <>
      <Navbar />
      <div className="contact-us-container">
        <h2 className="text-left mt-3">Contact Us</h2>
        <p>
          Got a question about our live gold prices or anything else? Send us a
          message using the form below and we'll get back to you as soon as
          possible. Please note, we currently do not buy/sell any gold, we are
          only interested in providing pricing data.
        </p>
        <div>
          <div className="row justify-content-center">
            <div className="col-md-8">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    {...formik.getFieldProps("name")}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-danger">{formik.errors.name}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    {...formik.getFieldProps("email")}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-danger">{formik.errors.email}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone:</label>
                  <input
                    type="text"
                    id="phone"
                    className="form-control"
                    {...formik.getFieldProps("phone")}
                  />
                  {formik.touched.phone && formik.errors.phone && (
                    <div className="text-danger">{formik.errors.phone}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message:</label>
                  <textarea
                    id="message"
                    className="form-control"
                    {...formik.getFieldProps("message")}
                  />
                  {formik.touched.message && formik.errors.message && (
                    <div className="text-danger">{formik.errors.message}</div>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-warning"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Send Message"}
                </button>
              </form>
            </div>
            <div className="col-md-4">
              {/* Image */}
              <img
                src="https://www.tomorrowmakers.com/ws/wp-content/uploads/2022/09/depositphotos_1782228-stock-photo-stacks-of-gold-coins.jpg"
                style={{ height: "100%", width: "100%" }}
                alt="Gold coins"
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUsForm;
