"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "../../utils/apiInstance";

const SocialMediaContext = createContext();

export function SocialMediaProvider({ children }) {
  const [socialLinks, setSocialLinks] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchSocialLinks = async () => {
      try {
        setLoading(true);
        const res = await api.get("ecom/social-media-settings");

        if (!isMounted) return;

        if (res?.data?.success) {
          setSocialLinks(res.data.data);
        } else {
          setSocialLinks(null);
        }
      } catch (err) {
        if (!isMounted) return;
        // Social media API error
        setError("Failed to load social media links");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSocialLinks();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <SocialMediaContext.Provider
      value={{ socialLinks, loading, error }}
    >
      {children}
    </SocialMediaContext.Provider>
  );
}

export const useSocialMedia = () => useContext(SocialMediaContext);
