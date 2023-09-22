import { Table } from 'react-bootstrap';
import { Message } from '../../components/Message';
import { Loader } from '../../components/Loader';
import { LinkContainer } from 'react-router-bootstrap';
import { x, check, del, editBlack } from '../../utils/lists';
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from '../../services/slices/usersApiSlice';
import { toast } from 'react-toastify';
import { ProfileHeader } from '../../components/ProfileHeader';

export const UserLists = () => {
  const { data: users, isLoading, refetch, error } = useGetUsersQuery();

  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        toast.success('User deleted successfully!');
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.message);
      }
    }
  };

  return (
    <>
      <ProfileHeader headerText="Users" />
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{`Status: ${error.status}, Data: ${error.data}`}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>USER ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <img src={check} alt="isAdmin" />
                    ) : (
                      <img src={x} alt="not-admin" />
                    )}
                  </td>

                  <td>
                    <LinkContainer
                      to={`/admin/user/${user._id}/edit`}
                      style={{ cursor: 'pointer', margin: '0 0.5rem' }}
                    >
                      <img src={editBlack} alt="isAdmin" />
                    </LinkContainer>
                    <img
                      src={del}
                      alt="delete-user"
                      onClick={() => deleteHandler(user._id)}
                      style={{ cursor: 'pointer', margin: '0 0.5rem' }}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};
