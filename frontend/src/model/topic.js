const readAllTopics = async () => {
    try {
      const res = await fetch('/api/topic/view');
      const TopicView = await res.json();
      return TopicView;
    } catch (err) {
      console.error('readAllTopic::error: ', err);
      throw err;
    }
  };

  const addOneTopic = async (topic) => {
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify(topic),
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const response = await fetch('/api/topic/add', options);
  
      const createdTopic = await response.json();
  
      return createdTopic;
    } catch (err) {
      console.error('addOneTopic::error: ', err);
      throw err;
    }
  };

  const deleteOneTopic = async (id) => {
    try {
      const options = {
        method: 'DELETE',
      };
  
      const response = await fetch(`/api/topic/${id}`, options);
  
      const deletedTopic = await response.json();
  
      return deletedTopic;
    } catch (err) {
      console.error('deleteOneTopic::error: ', err);
      throw err;
    }
  };

  const updateOneTopic = async (id, newTopicData) => {
    try {
      const options = {
        method: 'PATCH',
        body: JSON.stringify(newTopicData),
        headers: {
          'Content-Type': 'application/json',
        },
      };
  
      const response = await fetch(`/api/topic/${id}`, options);
  
      const updatedTopic = await response.json();
  
      return updatedTopic;
    } catch (err) {
      console.error('updateOneTopic::error: ', err);
      throw err;
    }
  };
    

  export { readAllTopics, addOneTopic, deleteOneTopic, updateOneTopic };