import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiArrowDown, FiArrowUp, FiFilter } from 'react-icons/fi';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedApplication, setSelectedApplication] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  useEffect(() => {
    filterApplications();
  }, [statusFilter, searchTerm, applications]);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, appsRes] = await Promise.all([
        axios.get(`${API_URL}/admin/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
        axios.get(`${API_URL}/admin/applications`, {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      setStats(statsRes.data.data.summary);
      setApplications(appsRes.data.data);
      setFilteredApplications(appsRes.data.data);
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
    } finally {
      setLoading(false);
    }
  };

  const filterApplications = () => {
    let filtered = applications;

    if (statusFilter) {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (app) =>
          app.student?.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.student?.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.student?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          app.caseId.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredApplications(filtered);
  };

  const updateApplicationStatus = async (caseId, newStatus, note) => {
    try {
      await axios.put(
        `${API_URL}/admin/cases/${caseId}/status`,
        { status: newStatus, message: note },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchDashboardData();
      setSelectedApplication(null);
    } catch (error) {
      console.error('Failed to update application status', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage student applications and admissions</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          <StatCard
            title="Total Applications"
            value={stats?.total || 0}
            color="bg-blue-500"
            trend="+5%"
          />
          <StatCard
            title="New"
            value={stats?.new || 0}
            color="bg-gray-500"
          />
          <StatCard
            title="Under Review"
            value={stats?.underReview || 0}
            color="bg-yellow-500"
          />
          <StatCard
            title="Shortlisted"
            value={stats?.shortlisted || 0}
            color="bg-purple-500"
          />
          <StatCard
            title="Approved"
            value={stats?.approved || 0}
            color="bg-green-500"
            trend="+3%"
          />
          <StatCard
            title="Rejected"
            value={stats?.rejected || 0}
            color="bg-red-500"
          />
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex items-center gap-4 mb-4">
            <FiFilter size={20} className="text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-800">Filters</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Search by name, email, or case ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="">All Statuses</option>
              <option value="new">New</option>
              <option value="under-review">Under Review</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>

            <button className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition">
              Reset Filters
            </button>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800">
              Applications ({filteredApplications.length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Case ID
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Student Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Program
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredApplications.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                      No applications found
                    </td>
                  </tr>
                ) : (
                  filteredApplications.map((app) => (
                    <tr key={app._id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-mono text-gray-800">
                        {app.caseId}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {app.student?.firstName} {app.student?.lastName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-800">
                        {app.course?.name} @ {app.university?.name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {app.student?.email}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                            app.status
                          )}`}
                        >
                          {app.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => setSelectedApplication(app)}
                          className="text-blue-600 hover:text-blue-800 font-semibold"
                        >
                          Review
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {selectedApplication && (
        <ReviewModal
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onUpdate={updateApplicationStatus}
        />
      )}
    </div>
  );
};

// Helper Components
const StatCard = ({ title, value, color, trend }) => (
  <div className={`${color} rounded-lg shadow-md p-4 text-white`}>
    <p className="text-sm font-semibold opacity-80">{title}</p>
    <p className="text-3xl font-bold mt-2">{value}</p>
    {trend && <p className="text-xs mt-2 opacity-75">{trend} from last month</p>}
  </div>
);

const getStatusColor = (status) => {
  const colors = {
    new: 'bg-blue-100 text-blue-800',
    'under-review': 'bg-yellow-100 text-yellow-800',
    shortlisted: 'bg-purple-100 text-purple-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

const ReviewModal = ({ application, onClose, onUpdate }) => {
  const [newStatus, setNewStatus] = useState(application.status);
  const [note, setNote] = useState('');

  const handleSubmit = () => {
    onUpdate(application._id, newStatus, note);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">Review Application</h2>
          <p className="text-gray-600 mt-1">{application.caseId}</p>
        </div>

        <div className="p-6 space-y-6">
          {/* Application Info */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-3">Student Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Name</p>
                <p className="font-semibold text-gray-800">
                  {application.student?.firstName} {application.student?.lastName}
                </p>
              </div>
              <div>
                <p className="text-gray-600">Email</p>
                <p className="font-semibold text-gray-800">{application.student?.email}</p>
              </div>
              <div>
                <p className="text-gray-600">Program</p>
                <p className="font-semibold text-gray-800">{application.course?.name}</p>
              </div>
              <div>
                <p className="text-gray-600">JAMB Score</p>
                <p className="font-semibold text-gray-800">{application.jamb?.score}</p>
              </div>
            </div>
          </div>

          {/* Status Update */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Update Status
            </label>
            <select
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            >
              <option value="new">New</option>
              <option value="under-review">Under Review</option>
              <option value="shortlisted">Shortlisted</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-2">
              Admin Notes
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add notes about this decision..."
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Update Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
