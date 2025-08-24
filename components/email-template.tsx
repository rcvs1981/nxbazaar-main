
import * as React from "react";

export const EmailTemplate = ({
  name,
  redirectUrl,
  linkText,
  description,
  subject,
}: {
  name: string;
  redirectUrl: string;
  linkText: string;
  description: string;
  subject: string;
}) => (
  <div>
    <h2>{subject}</h2>
    <p>Hello {name},</p>
    <p>{description}</p>
    <a
      href={redirectUrl}
      style={{
        display: "inline-block",
        marginTop: "12px",
        padding: "10px 20px",
        backgroundColor: "#4f46e5",
        color: "white",
        borderRadius: "6px",
        textDecoration: "none",
      }}
    >
      {linkText}
    </a>
  </div>
);
