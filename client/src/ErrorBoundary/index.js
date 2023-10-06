import React, { useState, useEffect } from 'react';

function ErrorBoundary(props) {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const handleErrors = (error, errorInfo) => {
      setHasError(true);
      setError(error);
      console.error(error);
    };

    window.addEventListener('error', handleErrors);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener('error', handleErrors);
    };
  }, []);

  if (hasError) {
    return (
      <div>
        <h3 style={{textAlign:"center"}}>Something went wrong!</h3>
        <p>{error && error.toString()}</p>
      </div>
    );
  }

  return props.children;
}

export default ErrorBoundary;
