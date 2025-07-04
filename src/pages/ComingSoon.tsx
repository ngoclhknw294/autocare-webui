import React from 'react';

export const ComingSoon = (props: React.ComponentProps<'text'>) => {
  return <h3>{props.children} page is coming soon...</h3>;
};
