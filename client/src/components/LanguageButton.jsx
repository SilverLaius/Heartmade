import React, { Component } from "react";
import { withLocalize } from "react-localize-redux";
import "./LanguageButton.css";

const LanguageToggle = ({ languages, activeLanguage, setActiveLanguage }) => {
  return (
    <ul className="languages">
      {languages.map(language => (
        <li key={language.code} className="lang">
          <button
            onClick={() => setActiveLanguage(language.code)}
            className={
              language.code === "en" ? "lang-button__en" : "lang-button__de"
            }
          />
        </li>
      ))}
    </ul>
  );
};

export default withLocalize(LanguageToggle);
