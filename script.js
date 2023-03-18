


const chatbotMessages = document.querySelector('.chatbot-messages');
const chatbotInput = document.querySelector('.chatbot-input input');
const chatbotButton = document.querySelector('.chatbot-input button');

chatbotButton.addEventListener('click', () => {
  sendMessageFromInput();
});

chatbotInput.addEventListener('keydown', (event) => {
  if (event.keyCode === 13) {
    sendMessageFromInput();
  }
});

function sendMessageFromInput() {
  const message = chatbotInput.value;
  if (message.trim() != '') {
    addMessage('You', message);
    chatbotInput.value = '';
    showTyping();
    setTimeout(() => {
      sendMessage(message);
      removeTyping();
    }, 2000);
  }
}

function addMessage(sender, message) {
  const chatbotMessage = document.createElement('div');
  chatbotMessage.classList.add('chatbot-message');
  chatbotMessage.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatbotMessages.appendChild(chatbotMessage);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function showTyping() {
  const chatbotMessage = document.createElement('div');
  chatbotMessage.classList.add('chatbot-message', 'typing');
  chatbotMessage.innerHTML = 'Chatbot is typing...';
  chatbotMessages.appendChild(chatbotMessage);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function removeTyping() {
  const typingMessage = document.querySelector('.typing');
  if (typingMessage) {
    chatbotMessages.removeChild(typingMessage);
  }
}

const responses = [
  {
    message: 'Hi there!',
    keywords: ['hello', 'hi', 'hey']
  },
  {
    message: 'I am doing well, thank you. How can I assist you today?',
    keywords: ['how are you', 'how are things']
  },
  {
    message: 'price is good',
    keywords: ['how are prices', 'how are prices']
  },
  {
    message: new Date().toLocaleTimeString(),
    keywords: ['what time is it', 'time']
  },
  {
    message: 'I am a creation of Apurva',
    keywords: ['who created you']
  },
  {
    message: 'We sell a variety of products, including clothing, electronics, home goods, and more. You can browse our full selection on our website.',
    keywords: ['What products do you sell','list of products']
  },
  {
    message: 'To place an order, simply add the items you want to your shopping cart and proceed to checkout. You will be prompted to enter your shipping and payment information, and then you can submit your order.',
    keywords: ['How can I place an order']
  },
  {
    message: 'The delivery time depends on your location and the shipping option you choose at checkout. Generally, orders within the United States are delivered within 3-7 business days, while international orders can take up to 2-4 weeks.',
    keywords: ['How long will it take for my order to arrive']
  },
  {
    message:'We accept a variety of payment methods, including credit/debit cards, PayPal, and Apple Pay.',
    keywords:['What payment methods do you accept','payment']
  },
  {
    message: 'I am sorry, I did not understand your message. Please try again.',
    keywords: ['default']
  }
  
];

const fuseOptions = {
  keys: ['keywords']
};

const fuse = new Fuse(responses, fuseOptions);

function sendMessage(message) {
  const searchResult = fuse.search(message.toLowerCase());
  let response = '';
  for (let i = 0; i < searchResult.length; i++) {
    const keywords = searchResult[i].item.keywords;
    if (keywords.some(keyword => message.toLowerCase().includes(keyword))) {
      response = searchResult[i].item.message;
      break;
    }
  }
  if (response) {
    addMessage('Chatbot', response);
  }  else if (searchResult.length > 0) {
    addMessage('Chatbot', responses[5].message);
  } else {
    addMessage('Chatbot', responses[9].message);
  }
}




