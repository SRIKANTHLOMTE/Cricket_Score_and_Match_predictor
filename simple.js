 <script>
        // Tab switching functionality
        document.querySelectorAll('.tab-button').forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all tabs
                document.querySelectorAll('.tab-button').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.querySelectorAll('.tab-content').forEach(content => {
                    content.classList.remove('active');
                });
                
                // Add active class to clicked tab
                button.classList.add('active');
                const tabId = button.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
                
                // Hide results
                document.getElementById('match-result').style.display = 'none';
                document.getElementById('score-result').style.display = 'none';
            });
        });
        
        // Team selection functionality
        const team1Select = document.getElementById('team1');
        const team2Select = document.getElementById('team2');
        const tossWinnerSelect = document.getElementById('toss_winner');
        
        function updateTossOptions() {
            // Clear current options
            tossWinnerSelect.innerHTML = '<option value="">Select Toss Winner</option>';
            
            // Add teams if selected
            const team1 = team1Select.value;
            const team2 = team2Select.value;
            
            if (team1) {
                const option = document.createElement('option');
                option.value = team1;
                option.textContent = team1;
                tossWinnerSelect.appendChild(option);
            }
            
            if (team2) {
                const option = document.createElement('option');
                option.value = team2;
                option.textContent = team2;
                tossWinnerSelect.appendChild(option);
            }
        }
        
        team1Select.addEventListener('change', updateTossOptions);
        team2Select.addEventListener('change', updateTossOptions);
        
        // Prevent selecting same team
        team1Select.addEventListener('change', () => {
            const selectedTeam = team1Select.value;
            
            Array.from(team2Select.options).forEach(option => {
                option.disabled = false;
            });
            
            if (selectedTeam) {
                const option = team2Select.querySelector(`option[value="${selectedTeam}"]`);
                if (option) option.disabled = true;
            }
            
            if (team2Select.value === selectedTeam) {
                team2Select.value = '';
            }
        });
        
        team2Select.addEventListener('change', () => {
            const selectedTeam = team2Select.value;
            
            Array.from(team1Select.options).forEach(option => {
                option.disabled = false;
            });
            
            if (selectedTeam) {
                const option = team1Select.querySelector(`option[value="${selectedTeam}"]`);
                if (option) option.disabled = true;
            }
            
            if (team1Select.value === selectedTeam) {
                team1Select.value = '';
            }
        });
        
        // Similar functionality for batting/bowling team selection
        const battingTeamSelect = document.getElementById('batting_team');
        const bowlingTeamSelect = document.getElementById('bowling_team');
        
        battingTeamSelect.addEventListener('change', () => {
            const selectedTeam = battingTeamSelect.value;
            
            Array.from(bowlingTeamSelect.options).forEach(option => {
                option.disabled = false;
            });
            
            if (selectedTeam) {
                const option = bowlingTeamSelect.querySelector(`option[value="${selectedTeam}"]`);
                if (option) option.disabled = true;
            }
            
            if (bowlingTeamSelect.value === selectedTeam) {
                bowlingTeamSelect.value = '';
            }
        });
        
        bowlingTeamSelect.addEventListener('change', () => {
            const selectedTeam = bowlingTeamSelect.value;
            
            Array.from(battingTeamSelect.options).forEach(option => {
                option.disabled = false;
            });
            
            if (selectedTeam) {
                const option = battingTeamSelect.querySelector(`option[value="${selectedTeam}"]`);
                if (option) option.disabled = true;
            }
            
            if (battingTeamSelect.value === selectedTeam) {
                battingTeamSelect.value = '';
            }
        });
        
        // Match form submission
        const matchForm = document.getElementById('match-form');
        matchForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const team1 = document.getElementById('team1').value;
            const team2 = document.getElementById('team2').value;
            const venue = document.getElementById('venue').value;
            const tossWinner = document.getElementById('toss_winner').value;
            const matchType = document.getElementById('match_type').value;
            const pitchCondition = document.getElementById('pitch_condition').value;
            
            // Simple prediction logic
            let team1Prob, team2Prob;
            
            // Basic random prediction with slight toss advantage
            if (Math.random() > 0.5) {
                team1Prob = Math.floor(Math.random() * 30) + 50; // 50-80%
                team2Prob = 100 - team1Prob;
                
                // Toss advantage
                if (tossWinner === team2) {
                    team2Prob += 5;
                    team1Prob -= 5;
                }
            } else {
                team2Prob = Math.floor(Math.random() * 30) + 50; // 50-80%
                team1Prob = 100 - team2Prob;
                
                // Toss advantage
                if (tossWinner === team1) {
                    team1Prob += 5;
                    team2Prob -= 5;
                }
            }
            
            // Ensure probabilities are valid
            team1Prob = Math.max(0, Math.min(100, team1Prob));
            team2Prob = Math.max(0, Math.min(100, team2Prob));
            
            // Determine winner
            const winner = team1Prob > team2Prob ? team1 : team2;
            
            // Update UI with results
            document.getElementById('team1-name').textContent = team1;
            document.getElementById('team2-name').textContent = team2;
            document.getElementById('team1-probability').textContent = `Win Probability: ${team1Prob}%`;
            document.getElementById('team2-probability').textContent = `Win Probability: ${team2Prob}%`;
            document.getElementById('predicted-winner').textContent = winner;
            
            // Highlight winner
            const team1Prediction = document.getElementById('team1-prediction');
            const team2Prediction = document.getElementById('team2-prediction');
            
            if (winner === team1) {
                team1Prediction.classList.add('winner');
                team2Prediction.classList.remove('winner');
            } else {
                team2Prediction.classList.add('winner');
                team1Prediction.classList.remove('winner');
            }
            
            // Show results
            document.getElementById('match-result').style.display = 'block';
        });
        
        // Score form submission
        const scoreForm = document.getElementById('score-form');
        scoreForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form values
            const battingTeam = document.getElementById('batting_team').value;
            const bowlingTeam = document.getElementById('bowling_team').value;
            const venue = document.getElementById('score_venue').value;
            const innings = document.getElementById('innings').value;
            const matchType = document.getElementById('score_match_type').value;
            const pitchCondition = document.getElementById('score_pitch_condition').value;
            
            // Simple score prediction
            let baseScore;
            
            // Base score by match type
            if (matchType === 'T20') {
                baseScore = 160;
            } else if (matchType === 'ODI') {
                baseScore = 280;
            } else { // Test
                baseScore = 350;
            }
            
            // Adjust for pitch condition
            if (pitchCondition === 'Batting') {
                baseScore *= 1.1;
            } else if (pitchCondition === 'Bowling') {
                baseScore *= 0.9;
            }
            
            // Adjust for innings
            if (innings === '2') {
                baseScore *= 0.95; // Slightly lower for 2nd innings
            }
            
            // Add randomness
            const randomFactor = Math.floor(Math.random() * 40) - 20;
            const predictedScore = Math.floor(baseScore + randomFactor);
            
            // Range
            const lowerRange = predictedScore - 15;
            const upperRange = predictedScore + 15;
            
            // Update UI
            document.getElementById('score-heading').textContent = 
                `${battingTeam} vs ${bowlingTeam} at ${venue} (${matchType})`;
            document.getElementById('predicted-score').textContent = predictedScore;
            document.getElementById('score-range').textContent = `Estimated range: ${lowerRange}-${upperRange}`;
            
            // Show results
            document.getElementById('score-result').style.display = 'block';
        });
    </script>
