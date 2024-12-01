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
        return 'bg-blue-50 text-blue-700 ring-1 ring-inset ring-blue-600/20';
      case 'Editor':
        return 'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20';
      case 'Admin':
        return 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20';
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
    <div className="p-6 pt-24">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Team Members</h1>
        <p className="text-sm text-gray-500 mt-1">Manage team members and their roles</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users && users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{user.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      {user.roles.map((role, index) => (
                        <span
                          key={index}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(role)}`}
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      onChange={(e) => handleRoleChange(user._id, e.target.value)}
                      className="block w-full text-sm rounded-lg border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
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
      </div>
    </div>
  );
};

export default Page;
