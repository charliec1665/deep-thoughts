import React from 'react';
import ThoughtList from '../components/ThoughtList';
// import useQuery Hook from Apollo Client
import { useQuery } from '@apollo/client';
// import query created in utils/queries.js
import { QUERY_THOUGHTS } from '../utils/queries';

const Home = () => {
  // use useQuery hook to make query request
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  // optional chaining: only currently usable in browsers. Negates need to check if an object exists before accessing its properties
    // i.e. 'if data exists, store it in the thoughts constant' OR 'if data is undefined, save an empty array to the thoughts component
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {/* display message indicating the query has not completed yet*/}
          {loading ? (
            <div>Loading...</div>
          ) : (
          // once query is complete we pass the thoughts array and a custom title as props
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home;
