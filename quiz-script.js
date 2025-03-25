document.addEventListener("DOMContentLoaded", function () {
    const quizForm = document.getElementById("book-quiz");
    const outputDiv = document.getElementById("quiz-output");
  
    outputDiv.style.display = "none";

    quizForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevents page reload
  
        let traits = [];
        let bookRecommendations = [];
  
        const answers = new FormData(quizForm);
  
        // Mapping user selections to personality traits and books
        const traitsMap = {
            "adventure": "You thrive on new experiences, always seeking to conquer the unknown. Adventure calls to you.",
            "pleasant": "Your heart beats to the rhythm of love, and you cherish the beauty of intimate connections.",
            "reflective": "You often find yourself lost in deep thought, contemplating life's mysteries and the world around you.",
            "energetic": "You’re always on the move, with boundless energy and an enthusiasm that’s contagious to everyone around you.",
            "curious": "The world is full of questions, and you’re eager to find the answers. Curiosity is your driving force.",
  
            "forest": "You feel most at home surrounded by the peace and serenity of nature, where the trees are your companions.",
            "coastal": "There’s a quiet calm in the rhythm of the waves, and you find comfort in the simple beauty of the sea and shore.",
            "future": "Your mind is always racing ahead, fascinated by what technology and innovation have in store for the world.",
            "past": "History is a treasure trove for you, where you find wisdom and stories that shape the present.",
            "imaginary": "The world of dreams and fantasy feels as real as the world we see. You’re a dreamer at heart.",
  
            "outsider": "You’re not afraid to stand apart from the crowd, seeking meaning and truth in places others may overlook.",
            "inventor": "Innovation flows through you, always looking for new ways to solve problems and make the impossible possible.",
            "fighter": "You meet challenges head-on, with determination and grit that never back down from adversity.",
            "royal": "There’s an air of nobility around you, and you carry yourself with dignity and grace, as if born to lead.",
            "trickster": "A mischievous streak runs through you, finding joy in playful pranks and clever tricks.",
  
            "inner": "You find wisdom in contemplation, seeking deeper truths about life and existence within yourself.",
            "connection": "Your heart is your compass, and you believe in the timeless beauty of a love that lasts forever.",
            "epic": "Every day feels like an epic adventure, and you approach life with a sense of grandness and daring.",
            "mystery": "You have a detective’s mind, always solving puzzles and uncovering secrets that others miss.",
            "discovery": "The thrill of finding something new fuels your spirit. You’re always on the lookout for the next big revelation.",
  
            "70s": "You revel in the classics, where the golden age of cinema and culture shaped a timeless era of style and grace.",
            "80s": "Action-packed and fast-paced, you live for the thrill and intensity that only the 80s could deliver.",
            "90s": "You chase the adrenaline rush, finding excitement in the unexpected twists that keep you on the edge of your seat.",
            "2000s": "You’re a true lover of sci-fi, where futuristic worlds and cutting-edge technology open new frontiers for imagination.",
  
            "drama": "You feel deeply, your emotions guiding you through the highs and lows of life, with insight and empathy.",
            "comedy": "Laughter is your language, and you see the world through a lens of humor, finding joy in every moment.",
            "thriller": "Strategic thinking is your forte. You thrive on the edge of suspense, always calculating your next move.",
            "fantasy": "Your imagination knows no bounds, transporting you to worlds of magic, myth, and adventure.",
            "slice-of-life": "You see beauty in the simplicity of everyday life, finding meaning in the small, ordinary moments.",
  
            "travel": "The world is your playground, and you live for the excitement of discovering new places, cultures, and experiences.",
            "cook": "In the kitchen, you are an artist, crafting delicious masterpieces that are as beautiful as they are flavorful.",
            "debate": "Your mind is sharp and analytical, and you love a good intellectual challenge where ideas clash and evolve.",
            "chill": "Life’s too short to rush. You enjoy a laid-back pace, soaking in the moment without any stress or hurry.",
            "craft": "Creativity flows through your fingertips, whether you’re painting, building, or crafting something uniquely your own.",
  
            "happy": "Optimism is your superpower. You always see the glass half full, radiating positivity and joy wherever you go.",
            "open": "Your spirit is free, and you embrace life’s unpredictability with a sense of adventure and openness.",
            "tragic": "You carry a quiet sorrow with you, finding beauty in the bittersweet moments that shape your story.",
            "twist": "You love surprises and twists that keep life interesting, never quite knowing what’s coming next but always ready.",
            "moral": "Philosophy guides your actions. You ponder deep questions and strive to live a life based on principle and wisdom."
  
        };
  
        const bookMap = {
            "adventure": ["The Hobbit by J.R.R. Tolkien", "Treasure Island by Robert Louis Stevenson"],
            "pleasant": ["Pride and Prejudice by Jane Austen", "The Notebook by Nicholas Sparks"],
            "reflective": ["The Alchemist by Paulo Coelho", "Tuesdays with Morrie by Mitch Albom"],
            "energetic": ["The Hunger Games by Suzanne Collins", "Percy Jackson by Rick Riordan"],
            "curious": ["Sapiens by Yuval Noah Harari", "The Code Book by Simon Singh"],
  
            "forest": ["The Lord of the Rings by J.R.R. Tolkien", "The Jungle Book by Rudyard Kipling"],
            "coastal": ["Where the Crawdads Sing by Delia Owens", "The Old Man and the Sea by Ernest Hemingway"],
            "future": ["Neuromancer by William Gibson", "The Martian by Andy Weir"],
            "past": ["The Pillars of the Earth by Ken Follett", "Wolf Hall by Hilary Mantel"],
            "imaginary": ["Alice in Wonderland by Lewis Carroll", "The Night Circus by Erin Morgenstern"],
  
            "outsider": ["The Left Hand of Darkness by Ursula K. Le Guin", "The Three-Body Problem by Liu Cixin"],
            "inventor": ["Elon Musk: Tesla, SpaceX, and the Quest for a Fantastic Future by Ashlee Vance", "The Wright Brothers by David McCullough"],
            "fighter": ["The Art of War by Sun Tzu", "Gladiator by Ben Macintyre"],
            "royal": ["The Other Boleyn Girl by Philippa Gregory", "Game of Thrones by George R.R. Martin"],
            "trickster": ["Loki: Where Mischief Lies by Mackenzi Lee", "Good Omens by Neil Gaiman and Terry Pratchett"],
  
            "inner": ["Man’s Search for Meaning by Viktor E. Frankl", "The Power of Now by Eckhart Tolle"],
            "connection": ["Me Before You by Jojo Moyes", "The Fault in Our Stars by John Green"],
            "epic": ["The Odyssey by Homer", "Eragon by Christopher Paolini"],
            "mystery": ["Gone Girl by Gillian Flynn", "Sherlock Holmes by Sir Arthur Conan Doyle"],
            "discovery": ["The Lost City of Z by David Grann", "Into the Wild by Jon Krakauer"],
  
            "70s": ["The Godfather by Mario Puzo", "In Cold Blood by Truman Capote"],
            "80s": ["It by Stephen King", "American Psycho by Bret Easton Ellis"],
            "90s": ["Jurassic Park by Michael Crichton", "Fight Club by Chuck Palahniuk"],
            "2000s": ["The Road by Cormac McCarthy", "The Girl with the Dragon Tattoo by Stieg Larsson"],
  
            "drama": ["To Kill a Mockingbird by Harper Lee", "The Kite Runner by Khaled Hosseini"],
            "comedy": ["Good Omens by Neil Gaiman and Terry Pratchett", "Bridget Jones’s Diary by Helen Fielding"],
            "thriller": ["The Silence of the Lambs by Thomas Harris", "The Girl with the Dragon Tattoo by Stieg Larsson"],
            "fantasy": ["Harry Potter by J.K. Rowling", "Mistborn by Brandon Sanderson"],
            "slice-of-life": ["Norwegian Wood by Haruki Murakami", "A Man Called Ove by Fredrik Backman"],
  
            "travel": ["Eat, Pray, Love by Elizabeth Gilbert", "On the Road by Jack Kerouac"],
            "cook": ["Julie & Julia by Julie Powell", "Salt, Fat, Acid, Heat by Samin Nosrat"],
            "debate": ["Sapiens by Yuval Noah Harari", "12 Rules for Life by Jordan B. Peterson"],
            "chill": ["The Little Prince by Antoine de Saint-Exupéry", "Winnie the Pooh by A.A. Milne"],
            "craft": ["The Creative Habit by Twyla Tharp", "Big Magic by Elizabeth Gilbert"],
  
            "happy": ["Anne of Green Gables by L.M. Montgomery", "Little Women by Louisa May Alcott"],
            "open": ["Kafka on the Shore by Haruki Murakami", "One Hundred Years of Solitude by Gabriel García Márquez"],
            "tragic": ["Atonement by Ian McEwan", "The Book Thief by Markus Zusak"],
            "twist": ["Gone Girl by Gillian Flynn", "And Then There Were None by Agatha Christie"],
            "moral": ["The Giving Tree by Shel Silverstein", "Tuesdays with Morrie by Mitch Albom"]
        };
  
        // Process the selected answers
        for (const [key, value] of answers.entries()) {
            if (traitsMap[value]) {
                traits.push(traitsMap[value]);
            }
            if (bookMap[value]) {
                bookRecommendations.push(...bookMap[value]);
            }
        }
  
        // Select a random book from the recommendations
        let recommendedBook = bookRecommendations.length > 0 ? bookRecommendations[Math.floor(Math.random() * bookRecommendations.length)] : "No book found";
  
        // Display the output
        outputDiv.innerHTML = `
            <h2>Your Personality Traits:\n</h2>
            <p>${traits.join("\n")}</p>
            <h2>Recommended Book for You:</h2>
            <p>${recommendedBook}</p>
        `;

        outputDiv.style.display = "block";
        
    });
  });