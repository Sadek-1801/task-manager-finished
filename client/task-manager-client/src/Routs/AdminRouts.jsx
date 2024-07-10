import PropTypes from 'prop-types'
import useRole from '../Hooks/useRole';
import { Navigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const AdminRouts = ({ children }) => {
    const [role, isLoading] = useRole()
    const { user, loader } = useAuth()

    if (isLoading || loader) return <div><p>Loading.......</p></div>
    if (role !== 'admin' && !user) return <Navigate to='/login' state={location?.pathname} replace='true' />
    return children
};
AdminRouts.propTypes = {
    children: PropTypes.element,
}

export default AdminRouts;