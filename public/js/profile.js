const newFormHandler = async (event) => {
    event.preventDefault();
  
    const name = document.querySelector('#posts-name').value.trim();
    // const needed_funding = document.querySelector('#posts-funding').value.trim();
    const description = document.querySelector('#posts-desc').value.trim();
  
    if (name && description) {
      const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({ name, description }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to create post');
      }
    }
  };
  
  const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        document.location.replace('/profile');
      } else {
        alert('Failed to delete post');
      }
    }
  };
  
  document
    .querySelector('.new-posts-form')
    .addEventListener('submit', newFormHandler);
  
  document
  //  .querySelector('.posts-list') 
    .addEventListener('click', delButtonHandler);
  