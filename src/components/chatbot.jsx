import { useEffect } from 'react';
// replace the chatbot id with your chatbot id egenrated from the website
// website: https://www.chatbase.co/auth/signin?redirectedFrom=%2Fdashboard
const ChatBotEmbed = () => {
  useEffect(() => {
    const script1 = document.createElement('script');
    script1.innerHTML = `
      window.embeddedChatbotConfig = {
        chatbotId: "CHAT_BOT_ID_REPLACE",
        domain: "www.chatbase.co"
      };
    `;
    document.body.appendChild(script1);

    const script2 = document.createElement('script');
    script2.src = "https://www.chatbase.co/embed.min.js";
    script2.setAttribute('chatbotId', "CHAT_BOT_ID_REPLACE");
    script2.setAttribute('domain', "www.chatbase.co");
    script2.defer = true;
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return null; // No visual component needed, just embedding scripts.
};

export default ChatBotEmbed;
