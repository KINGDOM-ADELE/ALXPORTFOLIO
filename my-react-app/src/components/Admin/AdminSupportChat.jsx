import React, { useContext, useEffect, useRef } from 'react';
import ChatInterface from '../General/ChatInterface';
import { AppContext } from '../../Context/App_Context';
import HeaderAdmin from '../General/HeaderAdmin';
import PostForm from '../General/PostForm';
import Swal from 'sweetalert2';

export function AdminSupportChat() {
  const { API_base_url, setPageTitle, getStoredToken, getStoredUserObj, messages, setMessages } = useContext(AppContext);

  const myUserId = useRef(getStoredUserObj()._id);

  useEffect(() => {
    setPageTitle('SUPPORT CHATS');
    return () => {
      // Cleanup if necessary
    };
  }, [setPageTitle]);

  const support_ticket_id = useRef('null');
  const support_ticket_Topic = useRef('null');

  const HandleParams = () => {
    const params = new URL(document.location).searchParams;
    support_ticket_id.current = params.get('ticket');
    support_ticket_Topic.current = params.get('topic');
  };

  HandleParams();

  useEffect(() => {
    const fetchData = async () => {
      let url = `${API_base_url}api/v1/supports/allon_ticket_id/${support_ticket_id.current}`;
      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${getStoredToken()}`,
          },
        });
        const data = await response.json();
        if (data.status === 'success') {
          setMessages(data.data);
        } else {
          throw Error('Could not fetch the data for that resource, ' + data.message);
        }
      } catch (error) {
        Swal.fire(error.message);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setMessages]);

  return (
    <div className="chat-app-container">
      <div className="chat-app-content">
        <HeaderAdmin topic={support_ticket_Topic.current} userid={myUserId.current} />
        <div className="chat-messages" style={{ height: 'calc(100vh - 136px)' }}>
          <ChatInterface messages={messages} userid={myUserId.current} />
        </div>
        <PostForm support_ticket_id={support_ticket_id.current} myUserId={myUserId} />
      </div>
    </div>
  );
}

