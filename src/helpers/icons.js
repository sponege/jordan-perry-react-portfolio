import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faSignOutAlt,
  faEdit,
  faSpinner,
  faPlusCircle,
  faSignInAlt,
  faPhone,
  faEnvelope,
  faMapMarkedAlt,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

const Icons = () => {
  return library.add(
    faTrash,
    faSignOutAlt,
    faEdit,
    faSpinner,
    faPlusCircle,
    faSignInAlt,
    faPhone,
    faEnvelope,
    faMapMarkedAlt,
    faLock
  ); // trash icon, sign out icon, edit icon, spinner for loading blog posts, plus circle to add new blog post, sign in icon, phone, envelope, map icon, lock icon (password)
};

export default Icons;
