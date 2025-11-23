 import { useState } from "react";
import {
  FaInstagram,
  FaGithub,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaEnvelope,
  FaHeart,
  FaPaperPlane
} from "react-icons/fa";

import { db } from "../firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "El nombre es obligatorio 💕";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "El correo no es válido 💌";
    if (!formData.projectType) newErrors.projectType = "Selecciona un proyecto 🌸";
    if (!formData.message.trim()) newErrors.message = "Escribe un mensaje ✏️";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const saveContact = async () => {
    const contactosRef = collection(db, "Contactos");
    await addDoc(contactosRef, {
      name: formData.name,
      email: formData.email,
      projectType: formData.projectType,
      message: formData.message,
      createdAt: Timestamp.now(),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await saveContact();
      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        projectType: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Error al enviar mensaje.");
    }

    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50 text-center px-4">
        <div className="bg-white shadow-lg rounded-2xl p-8 border border-pink-100 transform hover:-translate-y-1 transition-all">
          <div className="text-6xl mb-4">🎀</div>
          <h2 className="text-2xl font-bold text-pink-600 mb-2">
            ¡Gracias por tu mensaje!
          </h2>
          <p className="text-gray-600 mb-6">
            Te responderemos pronto con mucho cariño 💖
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="bg-gradient-to-r from-pink-400 to-rose-400 text-white px-6 py-3 rounded-lg font-semibold hover:scale-105 hover:shadow-lg transition-all"
          >
            Enviar otro 💌
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-pink-50 min-h-screen py-16">
      <section className="bg-pink-300 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-6">💌 Contáctanos</h1>
        <p className="text-xl max-w-2xl mx-auto">
          Cuéntanos tu idea y hagámosla realidad con un toque de magia y dulzura ✨
        </p>
      </section>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 px-6 mt-12">
        <div className="bg-white rounded-2xl shadow-md p-8 border border-pink-100 transform hover:-translate-y-2 hover:scale-105 transition-all">
          <h2 className="text-2xl font-semibold text-pink-600 mb-4 text-center bg-pink-100 rounded-xl py-2 px-4 inline-block">
            🌷 Información
          </h2>
          <ul className="space-y-3 text-gray-700">
            <li>📧 hola@kittycode.dev</li>
            <li>💖 proyectos@kittycode.dev</li>
            <li>🐾 contacto@kittycode.dev</li>
          </ul>

          <div className="mt-8 border-t border-pink-200 pt-4">
            <p className="font-semibold text-pink-600 mb-3">Síguenos:</p>
            <div className="flex flex-wrap gap-4 text-2xl text-pink-500">
              <a href="#" className="hover:scale-110 hover:text-rose-500 transition"><FaInstagram /></a>
              <a href="#" className="hover:scale-110 hover:text-rose-500 transition"><FaTiktok /></a>
              <a href="#" className="hover:scale-110 hover:text-rose-500 transition"><FaYoutube /></a>
              <a href="#" className="hover:scale-110 hover:text-rose-500 transition"><FaGithub /></a>
              <a href="#" className="hover:scale-110 hover:text-rose-500 transition"><FaLinkedin /></a>
              <a href="mailto:hola@kittycode.dev" className="hover:scale-110 hover:text-rose-500 transition"><FaEnvelope /></a>
            </div>
          </div>

          <div className="mt-10 text-center text-pink-500">
            <FaHeart className="inline mr-1" /> 
            Hecho con amor por <span className="font-semibold">Kitty Code</span>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl shadow-md p-8 border border-pink-100 transform hover:-translate-y-2 hover:scale-105 transition-all">
          <h2 className="text-2xl font-semibold text-pink-600 mb-6 text-center bg-pink-100 rounded-xl py-2 px-4 inline-block">
            💬 Envíanos un mensaje
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Nombre *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-transparent ${
                  errors.name ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="Tu nombre completo"
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Correo *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-transparent ${
                  errors.email ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="tu@email.com"
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de proyecto *</label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-transparent ${
                  errors.projectType ? "border-red-400" : "border-gray-300"
                }`}
              >
                <option value="">Selecciona una opción</option>
                <option value="web">🌐 Sitio Web</option>
                <option value="app">📱 Aplicación</option>
                <option value="diseño">🎨 Diseño</option>
                <option value="otro">✨ Otro</option>
              </select>
              {errors.projectType && <p className="text-red-500 text-sm">{errors.projectType}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Mensaje *</label>
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-300 focus:border-transparent resize-none ${
                  errors.message ? "border-red-400" : "border-gray-300"
                }`}
                placeholder="Cuéntanos tu idea o proyecto con detalles ✨"
              ></textarea>
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex justify-center items-center gap-2 py-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-pink-400 to-rose-400 hover:scale-105 hover:shadow-lg"
              }`}
            >
              <FaPaperPlane />
              {isSubmitting ? "Enviando..." : "Enviar mensaje"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

