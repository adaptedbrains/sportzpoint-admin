"use client";
import React, { useEffect, useState } from 'react';
import useDropDownDataStore from '../../store/dropDownDataStore';
import Cookies from 'js-cookie';

const Page = () => {
  const { allRoleBaseUser, fetchDropDownData } = useDropDownDataStore();
 const [users, setUsers] = useState([])
  useEffect(() => {
    fetchDropDownData(`https://sportzpoint-be.onrender.com/user`, 'roleBaseUser');
    
  }, [fetchDropDownData]);
  useEffect(()=>{
    setUsers(allRoleBaseUser)
  },[allRoleBaseUser])

  const getRoleColor = (role) => {
    switch (role) {
      case 'Author':
        return 'bg-blue-200 text-blue-800';
      case 'Editor':
        return 'bg-yellow-200 text-yellow-800';
      case 'Admin':
        return 'bg-red-200 text-red-800';
      default:
        return '';
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    const token = Cookies.get('token');
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user/team-members/update/${userId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ roles: [newRole] }),
        }
      );

      if (response.ok) {
        const updatedUser = await response.json();

        setUsers((prevUsers) => {
          const index = prevUsers.findIndex((user) => user._id === userId);
          if (index !== -1) {
            const updatedUsers = [...prevUsers];
            updatedUsers[index] = updatedUser.updatedUser;
            return updatedUsers;
            
          }
          return prevUsers;
        });
      } else {
        console.error('Failed to update role:', await response.text());
      }
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  return (
    <div className="mx-[15px] mt-16 bg-white rounded">
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border-b font-semibold">Name</th>
            <th className="px-4 py-2 border-b font-semibold">Email</th>
            <th className="px-4 py-2 border-b font-semibold">Roles</th>
            <th className="px-4 py-2 border-b font-semibold">Edit</th>
          </tr>
        </thead>
        <tbody>
          {users &&
            users.map((user) => (
              <tr key={user._id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">
                  {user.roles.map((role, index) => (
                    <span
                      key={index}
                      className={`px-2 py-1 rounded ${getRoleColor(role)}`}
                    >
                      {role}
                    </span>
                  ))}
                </td>
                <td className="px-4 py-2">
                  <select
                    onChange={(e) => handleRoleChange(user._id, e.target.value)}
                    className="px-4 py-2 border rounded"
                    defaultValue={user.roles[0]}
                  >
                    <option value="Editor">Editor</option>
                    <option value="Author">Author</option>
                    <option value="Admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Page;
