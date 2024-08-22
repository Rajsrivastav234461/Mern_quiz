import React from 'react';

const FinishTestPage = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100vw',
      padding: '20px',
      background: 'linear-gradient(135deg, #ff7f50, #98fb98)', 
      color: '#333333',  
    }}>
      <div style={{
        textAlign: 'center',
        maxWidth: '80%',
        padding: '30px',
        backgroundColor: 'rgba(255, 255, 255, 0.9)', 
        border: '2px solid #333333',  
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',  
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '20px',
          borderBottom: '2px solid #333333',
          paddingBottom: '10px',
        }}>
          Test Completed
        </h1>
        <p style={{
          fontSize: '1.25rem',
          lineHeight: '1.6',
          margin: '0',
        }}>
          Submission complete! Thank you for participating in the test.
        </p>
      </div>
    </div>
  );
};

export default FinishTestPage;
