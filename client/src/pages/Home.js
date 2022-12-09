import React from 'react';
import Auth from '../utils/auth';
import ThoughtList from '../components/ThoughtList';
import FriendList from '../components/FriendList';
// import useQuery Hook from Apollo Client
import { useQuery } from '@apollo/client';
// import query created in utils/queries.js
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  // use object destructuring to extract `data` from the `useQuery` Hook's response and rename it `userData` to be more descriptive
  const { data: userData } = useQuery(QUERY_ME_BASIC);

  // optional chaining: only currently usable in browsers. Negates need to check if an object exists before accessing its properties
    // i.e. 'if data exists, store it in the thoughts constant' OR 'if data is undefined, save an empty array to the thoughts component
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  // if logged in, loggedIn variable will be true
  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {/* display message indicating the query has not completed yet*/}
          {loading ? (
            <div>Loading...</div>
          ) : (
          // once query is complete we pass the thoughts array and a custom title as props
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
