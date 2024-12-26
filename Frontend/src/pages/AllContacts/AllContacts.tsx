import { useEffect, useState } from 'react';
import './AllContacts.css'
import axios from 'axios'

const AllContacts = ({user, setIsAllContact, setSelectedContact}: any) => {
    
  const [allContacts, setIsAllContacts] = useState([]);
  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const result = await axios.get(`http://localhost:8000/api/v1/user/allContacts/${user?.id}`, {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });
        if(result){
          setIsAllContacts(result?.data?.data)
        }
      } catch (error) {
        console.error('Error fetching contacts:', error);
      }
    }
    fetchContacts();
  }, [user])
  
  const handleContact = async (contact:any)  => {
    setSelectedContact(contact)
    setIsAllContact(false)
  }

  return (
    <div style={{position:'absolute', left:'20px', height: '100%'}}>
      <h2 style={{left: '0', top: '10px'}}>All Contacts</h2>
      <ul style={{left: '1px', padding: '0px'}}>
        {allContacts.map((contact: any) => (
          <li className='contactli' key={contact.id} onClick={() => handleContact(contact)} >{contact.name}</li>
        ))}
      </ul>
    </div>
    // allContacts.map((item: any) => {
    //   <div className='AllContact'>
    //   <div className='contactImage'>image</div>
    //   <div className='contactName'>name</div>
    // </div>
    // })
  )
}

export default AllContacts
