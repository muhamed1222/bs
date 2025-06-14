import React from 'react';
import { Link } from 'react-router-dom';

interface AdminSectionLinkProps {
  to: string;
  title: string;
  description: string;
}

const AdminSectionLink: React.FC<AdminSectionLinkProps> = ({
  to,
  title,
  description,
}) => (
  <Link
    to={to}
    className="block bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
  >
    <h3 className="text-lg font-semibold font-pragmatica text-indigo-700 mb-1">
      {title}
    </h3>
    <p className="text-sm text-gray-600">{description}</p>
  </Link>
);

export default AdminSectionLink;
