import tkinter as tk
from tkinter import ttk
import random
from PIL import Image, ImageTk
import io
import base64
from datetime import datetime

# Base64 encoded simple Indian flag (this is a placeholder - you would need a real image)
INDIA_FLAG_B64 = """
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
"""

class CricketPredictor:
    def __init__(self, root):
        self.root = root
        self.root.title("Cricket Predictor")
        self.root.geometry("500x400")
        self.root.configure(bg="#f0f0f0")
        
        # Create main frame
        self.main_frame = ttk.Frame(root, padding="20")
        self.main_frame.pack(fill=tk.BOTH, expand=True)
        
        # Title
        ttk.Label(self.main_frame, text="Cricket Win & Score Predictor", 
                  font=("Arial", 18, "bold")).pack(pady=20)
        
        # Team selection
        team_frame = ttk.Frame(self.main_frame)
        team_frame.pack(pady=10, fill=tk.X)
        
        ttk.Label(team_frame, text="Team 1:").grid(row=0, column=0, padx=5, pady=5, sticky=tk.W)
        self.team1_var = tk.StringVar(value="India")
        ttk.Combobox(team_frame, textvariable=self.team1_var, 
                     values=["India", "Australia", "England", "New Zealand", "South Africa", "Pakistan"]).grid(
                     row=0, column=1, padx=5, pady=5)
        
        ttk.Label(team_frame, text="Team 2:").grid(row=1, column=0, padx=5, pady=5, sticky=tk.W)
        self.team2_var = tk.StringVar(value="Australia")
        ttk.Combobox(team_frame, textvariable=self.team2_var, 
                     values=["India", "Australia", "England", "New Zealand", "South Africa", "Pakistan"]).grid(
                     row=1, column=1, padx=5, pady=5)
        
        # Match type
        match_frame = ttk.Frame(self.main_frame)
        match_frame.pack(pady=10, fill=tk.X)
        
        ttk.Label(match_frame, text="Match Type:").grid(row=0, column=0, padx=5, pady=5, sticky=tk.W)
        self.match_type_var = tk.StringVar(value="T20")
        ttk.Combobox(match_frame, textvariable=self.match_type_var, 
                     values=["T20", "ODI", "Test"]).grid(row=0, column=1, padx=5, pady=5)
        
        # Venue
        venue_frame = ttk.Frame(self.main_frame)
        venue_frame.pack(pady=10, fill=tk.X)
        
        ttk.Label(venue_frame, text="Venue:").grid(row=0, column=0, padx=5, pady=5, sticky=tk.W)
        self.venue_var = tk.StringVar(value="Mumbai")
        ttk.Combobox(venue_frame, textvariable=self.venue_var,
                     values=["Mumbai", "Delhi", "Kolkata", "Chennai", "Bangalore", "Ahmedabad"]).grid(
                     row=0, column=1, padx=5, pady=5)
        
        # Predict button
        predict_btn = ttk.Button(self.main_frame, text="Predict", command=self.predict)
        predict_btn.pack(pady=20)
    
    def predict(self):
        # Create a new window for prediction results
        prediction_window = tk.Toplevel(self.root)
        prediction_window.title("Prediction Results")
        prediction_window.geometry("600x500")
        prediction_window.configure(bg="#e6f7ff")
        
        # Create Indian flag image from base64
        flag_data = base64.b64decode(INDIA_FLAG_B64)
        flag_image = Image.open(io.BytesIO(flag_data))
        flag_image = flag_image.resize((200, 150))
        flag_photo = ImageTk.PhotoImage(flag_image)
        
        # Display flag
        flag_label = ttk.Label(prediction_window, image=flag_photo)
        flag_label.image = flag_photo  # Keep a reference to avoid garbage collection
        flag_label.pack(pady=20)
        
        # Display prediction text
        prediction_text = ttk.Label(prediction_window, 
                                   text="INDIA INTO THE FINAL!",
                                   font=("Arial", 24, "bold"))
        prediction_text.pack(pady=10)
        
        # Display final info
        final_date = "9th of March, 2025"
        final_text = ttk.Label(prediction_window,
                              text=f"The final will be played on {final_date}",
                              font=("Arial", 16))
        final_text.pack(pady=10)
        
        # Generate random score prediction
        team1 = self.team1_var.get()
        team2 = self.team2_var.get()
        match_type = self.match_type_var.get()
        
        if match_type == "T20":
            team1_score = random.randint(150, 220)
            team2_score = random.randint(140, 210)
        elif match_type == "ODI":
            team1_score = random.randint(250, 350)
            team2_score = random.randint(240, 340)
        else:  # Test
            team1_score = random.randint(300, 450)
            team2_score = random.randint(280, 430)
        
        # Always make India win
        if team1 == "India" and team1_score <= team2_score:
            team1_score = team2_score + random.randint(1, 30)
        elif team2 == "India" and team2_score <= team1_score:
            team2_score = team1_score + random.randint(1, 30)
        
        # Display score prediction
        score_frame = ttk.Frame(prediction_window)
        score_frame.pack(pady=20)
        
        ttk.Label(score_frame, text="Predicted Scores:", font=("Arial", 14, "bold")).grid(
            row=0, column=0, columnspan=2, pady=10)
        
        if team1 == "India" or team2 == "India":
            winner = "India"
            loser = team2 if team1 == "India" else team1
            win_score = team1_score if team1 == "India" else team2_score
            lose_score = team2_score if team1 == "India" else team1_score
            
            ttk.Label(score_frame, text=f"{winner}:", font=("Arial", 12, "bold")).grid(
                row=1, column=0, padx=5, pady=5, sticky=tk.W)
            ttk.Label(score_frame, text=f"{win_score}", font=("Arial", 12)).grid(
                row=1, column=1, padx=5, pady=5, sticky=tk.W)
            
            ttk.Label(score_frame, text=f"{loser}:", font=("Arial", 12)).grid(
                row=2, column=0, padx=5, pady=5, sticky=tk.W)
            ttk.Label(score_frame, text=f"{lose_score}", font=("Arial", 12)).grid(
                row=2, column=1, padx=5, pady=5, sticky=tk.W)
            
            win_margin = win_score - lose_score
            ttk.Label(score_frame, text=f"India wins by {win_margin} runs!", 
                     font=("Arial", 14, "bold"), foreground="#006600").grid(
                     row=3, column=0, columnspan=2, pady=10)
        else:
            # If India isn't playing, just show both scores
            ttk.Label(score_frame, text=f"{team1}:", font=("Arial", 12)).grid(
                row=1, column=0, padx=5, pady=5, sticky=tk.W)
            ttk.Label(score_frame, text=f"{team1_score}", font=("Arial", 12)).grid(
                row=1, column=1, padx=5, pady=5, sticky=tk.W)
            
            ttk.Label(score_frame, text=f"{team2}:", font=("Arial", 12)).grid(
                row=2, column=0, padx=5, pady=5, sticky=tk.W)
            ttk.Label(score_frame, text=f"{team2_score}", font=("Arial", 12)).grid(
                row=2, column=1, padx=5, pady=5, sticky=tk.W)
            
            winner = team1 if team1_score > team2_score else team2
            win_margin = abs(team1_score - team2_score)
            ttk.Label(score_frame, text=f"{winner} wins by {win_margin} runs!", 
                     font=("Arial", 14), foreground="#006600").grid(
                     row=3, column=0, columnspan=2, pady=10)
            
            # Still show India in final message
            ttk.Label(prediction_window, 
                     text="But India will be in the final too!",
                     font=("Arial", 12, "italic")).pack(pady=5)

if __name__ == "__main__":
    root = tk.Tk()
    app = CricketPredictor(root)
    root.mainloop()
