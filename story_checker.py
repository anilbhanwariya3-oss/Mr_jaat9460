import string
import re
from textstat import textstat

class StoryChecker:
    def __init__(self, text):
        self.text = text
        self.words = self._tokenize()

    def _tokenize(self):
        # Clean text and split into clean words
        clean_text = self.text.translate(str.maketrans("", "", string.punctuation))
        return clean_text.lower().split()

    def basic_metrics(self):
        """Calculates structural metrics of the story."""
        word_count = len(self.words)
        char_count = len(self.text)
        
        # Count sentences based on common punctuation punctuation
        sentences = len(re.findall(r'[.!?]+', self.text))
        sentences = max(1, sentences)  # Avoid division by zero
        
        avg_word_length = sum(len(word) for word in self.words) / word_count if word_count > 0 else 0
        avg_sentence_len = word_count / sentences

        return {
            "Word Count": word_count,
            "Character Count": char_count,
            "Sentence Count": sentences,
            "Avg Word Length": round(avg_word_length, 1),
            "Avg Sentence Length": round(avg_sentence_len, 1),
        }

    def analyze_readability(self):
        """Evaluates the reading ease and grade level of the story."""
        return {
            "Flesch Reading Ease": textstat.flesch_reading_ease(self.text),
            "Estimated Grade Level": textstat.flesch_kincaid_grade(self.text),
            "Reading Time (Minutes)": round(textstat.reading_time(self.text) / 60, 2)
        }

# --- Example Usage ---
if __name__ == "__main__":
    sample_story = """
    Once upon a time in a vibrant forest, a tiny eagle dreamed of soaring higher than the clouds. 
    Every day, it practiced stretching its wings. The older eagles laughed, saying it was too small. 
    But dedication defeats doubt. One bright morning, with a mighty leap, the little eagle caught a massive thermal wind and flew into history.
    """

    checker = StoryChecker(sample_story)
    
    print("=== Structural Metrics ===")
    for metric, val in checker.basic_metrics().items():
        print(f"{metric}: {val}")
        
    print("\n=== Readability Analysis ===")
    for metric, val in checker.analyze_readability().items():
        print(f"{metric}: {val}")
