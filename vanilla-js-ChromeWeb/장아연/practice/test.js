

function AddProgress() {
  event.target.className+="-slash"
  const prev_progress= document.getElementById( 'Progress' ).value
  const curr_progress=prev_progress+ 20;
  document.getElementById( 'Progress' ).value=curr_progress
  localStorage.setItem("current_progress",curr_progress); 
}

