import { Accordian } from './accordian.js';

// in next.js, nested folders define route structure
// but a route is not publicly accessible without a page.js or route.js
// only content returned by page.js or route.js is sent to the client
export default function AccordianPage() {
  return <Accordian />;
}
