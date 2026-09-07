const output = document.getElementById("output");
const one = document.getElementById("one");
const two = document.getElementById("two");
const three = document.getElementById("three");
const four = document.getElementById("four");
const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");

const apiKey = import.meta.env.VITE_API_KEY;
console.log("API key exists:", !!apiKey);

const askGemini = async (input, prompt) => {

    if (input === "") {
        alert("Please enter something");
        return;
    }

    output.value = "Generating...";

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `${prompt}: ${input}`
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();
        console.log(data);
        output.value = data?.candidates?.[0]?.content?.parts?.[0]?.text||"No response received.";
    } 
    catch (error) {
        console.log(error);
        output.value = "Something went wrong.";
    }
}

btn1.addEventListener("click", () => {
    const input = one.value;
    askGemini(input, "Answer this question clearly and simply");
});

btn2.addEventListener("click", () => {
    const input = two.value;
    askGemini(input,"Summarize this text in simple and short points");
});

btn3.addEventListener("click", () => {
    const input = three.value;
    askGemini(input, "Generate 5 useful and creative ideas about this topic");
});

btn4.addEventListener("click", () => {
    const input = four.value;
    askGemini(input, "Give me a simple definition of this word with one example");
});