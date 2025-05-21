"use client";

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">CareSmily</h3>
          <p className="text-gray-400 mb-6">
            介護記録作成を効率化する文例特化型アプリ
          </p>
          <div className="flex justify-center space-x-4 mb-6">
            <a href="#" className="hover:text-blue-400 transition-colors">
              利用規約
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              プライバシーポリシー
            </a>
            <a href="#" className="hover:text-blue-400 transition-colors">
              お問い合わせ
            </a>
          </div>
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} CareSmily. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;