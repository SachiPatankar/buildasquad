import React from "react";
import buildasquadLogo from "@/assets/buildasquad_logo.png";

export default function TermsOfServicePage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="flex items-center gap-3 mb-8">
        <img src={buildasquadLogo} alt="BuildASquad Logo" className="h-10 w-10 object-contain" />
        <span className="text-2xl font-bold text-black dark:text-white tracking-tight">BuildASquad</span>
      </div>
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">Welcome to BuildASquad! By accessing or using our platform, you agree to be bound by these Terms of Service. Please read them carefully.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Use of Service</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>You must be at least 13 years old to use BuildASquad.</li>
        <li>You are responsible for maintaining the confidentiality of your account information.</li>
        <li>You agree not to use the service for any unlawful or prohibited activities.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">Content</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>You retain ownership of the content you post, but grant us a license to use, display, and distribute it on our platform.</li>
        <li>You are responsible for the content you share and must not violate the rights of others.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">Termination</h2>
      <p className="mb-4">We reserve the right to suspend or terminate your access to BuildASquad at our discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users or the platform.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Disclaimer</h2>
      <p className="mb-4">BuildASquad is provided "as is" without warranties of any kind. We do not guarantee the accuracy, completeness, or reliability of any content or service.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p className="mb-4">If you have any questions about these Terms, please contact us at <a href="mailto:buildasquad.dev@gmail.com" className="text-blue-600 underline">buildasquad.dev@gmail.com</a>.</p>
      <p className="text-sm text-muted-foreground mt-8">Last updated: {new Date().getFullYear()}</p>
    </div>
  );
} 