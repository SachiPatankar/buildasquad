import React from "react";
import buildasquadLogo from "@/assets/buildasquad_logo.png";

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <div className="flex items-center gap-3 mb-8">
        <img src={buildasquadLogo} alt="BuildASquad Logo" className="h-10 w-10 object-contain" />
        <span className="text-2xl font-bold text-black dark:text-white tracking-tight">BuildASquad</span>
      </div>
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">At BuildASquad, your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Personal identification information (such as name, email address, profile photo, etc.)</li>
        <li>Usage data and cookies</li>
        <li>Communications and content you provide</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>To provide and maintain our service</li>
        <li>To improve and personalize your experience</li>
        <li>To communicate with you about updates, offers, and support</li>
        <li>To ensure security and prevent fraud</li>
      </ul>
      <h2 className="text-xl font-semibold mt-6 mb-2">Information Sharing</h2>
      <p className="mb-4">We do not sell your personal information. We may share information with trusted third parties who assist us in operating our platform, as required by law, or to protect our rights.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Your Rights</h2>
      <p className="mb-4">You have the right to access, update, or delete your personal information. You may also opt out of certain communications at any time.</p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Contact Us</h2>
      <p className="mb-4">If you have any questions or concerns about this Privacy Policy, please contact us at <a href="mailto:buildasquad.dev@gmail.com" className="text-blue-600 underline">buildasquad.dev@gmail.com</a>.</p>
      <p className="text-sm text-muted-foreground mt-8">Last updated: {new Date().getFullYear()}</p>
    </div>
  );
} 