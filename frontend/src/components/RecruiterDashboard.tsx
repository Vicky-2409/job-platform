'use client';

import { useState, useEffect, useCallback } from 'react';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  Filter, 
  RefreshCw, 
  UserCheck, 
  Mail,
  Calendar,
  Badge,
  Bell
} from 'lucide-react';
import toast from 'react-hot-toast';
import socketManager from '../lib/socket';
import { InterviewRequest, ApiResponse, FilterStatus, LoadingState, SocketEvents } from '../types';

export default function RecruiterDashboard() {
  const [requests, setRequests] = useState<InterviewRequest[]>([]);
  const [filteredRequests, setFilteredRequests] = useState<InterviewRequest[]>([]);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [loading, setLoading] = useState<LoadingState>({
    submit: false,
    accept: null,
    fetch: true
  });
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');

  // Fetch requests from API
  const fetchRequests = useCallback(async () => {
    try {
      setLoading(prev => ({ ...prev, fetch: true }));
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/interview-requests`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch requests');
      }
      
      const data: ApiResponse<InterviewRequest[]> = await response.json();
      
      if (data.success && data.data) {
        setRequests(data.data);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error('Failed to load interview requests');
    } finally {
      setLoading(prev => ({ ...prev, fetch: false }));
    }
  }, []);

  // Accept interview request
  const acceptRequest = async (id: string) => {
    try {
      setLoading(prev => ({ ...prev, accept: id }));
      
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/interview-requests/${id}/accept`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to accept request');
      }
      
      const data: ApiResponse<InterviewRequest> = await response.json();
      
      if (data.success && data.data) {
        // Update local state
        setRequests(prev => 
          prev.map(req => 
            req.id === id ? { ...req, status: 'accepted' } : req
          )
        );
        
        toast.success('Interview request accepted!');
      }
    } catch (error) {
      console.error('Error accepting request:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to accept request');
    } finally {
      setLoading(prev => ({ ...prev, accept: null }));
    }
  };

  // Filter requests based on status
  useEffect(() => {
    if (filterStatus === 'all') {
      setFilteredRequests(requests);
    } else {
      setFilteredRequests(requests.filter(req => req.status === filterStatus));
    }
  }, [requests, filterStatus]);

  // Socket.io setup
  useEffect(() => {
    const socket = socketManager.connect();
    
    socket.on('connect', () => {
      setConnectionStatus('connected');
      socketManager.joinRecruiterRoom();
      toast.success('Connected to real-time updates');
    });
    
    socket.on('disconnect', () => {
      setConnectionStatus('disconnected');
      toast.error('Lost real-time connection');
    });
    
    socket.on('connect_error', () => {
      setConnectionStatus('disconnected');
    });
    
    // Handle new interview requests
    socket.on('newInterviewRequest', (data: SocketEvents['newInterviewRequest']) => {
      console.log('New interview request received:', data);
      setRequests(prev => [data.data, ...prev]);
      toast.success(`New interview request from ${data.data.name}`, {
        icon: '🔔',
        duration: 6000,
      });
    });
    
    // Handle status updates
    socket.on('requestStatusUpdate', (data: SocketEvents['requestStatusUpdate']) => {
      console.log('Request status updated:', data);
      setRequests(prev => 
        prev.map(req => 
          req.id === data.data.id ? data.data : req
        )
      );
    });
    
    return () => {
      socketManager.disconnect();
    };
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(dateString));
  };

  const getStatusBadge = (status: string) => {
    if (status === 'accepted') {
      return <span className="badge-accepted">Accepted</span>;
    }
    return <span className="badge-pending">Pending</span>;
  };

  const getConnectionIndicator = () => {
    switch (connectionStatus) {
      case 'connected':
        return (
          <div className="flex items-center text-green-600">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
            <span className="text-sm">Live updates active</span>
          </div>
        );
      case 'connecting':
        return (
          <div className="flex items-center text-yellow-600">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2 animate-pulse" />
            <span className="text-sm">Connecting...</span>
          </div>
        );
      case 'disconnected':
        return (
          <div className="flex items-center text-red-600">
            <div className="w-2 h-2 bg-red-500 rounded-full mr-2" />
            <span className="text-sm">Disconnected</span>
          </div>
        );
      default:
        return null;
    }
  };

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    accepted: requests.filter(r => r.status === 'accepted').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Recruiter Dashboard
          </h1>
          <p className="text-gray-600">
            Manage interview requests in real-time
          </p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          {getConnectionIndicator()}
          <button
            onClick={fetchRequests}
            disabled={loading.fetch}
            className="btn-secondary flex items-center space-x-2"
          >
            <RefreshCw className={`w-4 h-4 ${loading.fetch ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Requests</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Accepted</p>
              <p className="text-2xl font-bold text-gray-900">{stats.accepted}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <span className="font-medium text-gray-700">Filter by status:</span>
            <div className="flex space-x-2">
              {(['all', 'pending', 'accepted'] as FilterStatus[]).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    filterStatus === status
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                  {status !== 'all' && (
                    <span className="ml-1 text-xs">
                      ({status === 'pending' ? stats.pending : stats.accepted})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Showing {filteredRequests.length} of {requests.length} requests
          </div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="card overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 flex items-center">
            <Bell className="w-5 h-5 mr-2" />
            Interview Requests
          </h3>
        </div>

        {loading.fetch ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-2 text-gray-500">
              <RefreshCw className="w-5 h-5 animate-spin" />
              <span>Loading requests...</span>
            </div>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-12">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {filterStatus === 'all' ? 'No requests yet' : `No ${filterStatus} requests`}
            </h3>
            <p className="text-gray-500">
              {filterStatus === 'all' 
                ? 'Interview requests will appear here when applicants submit them.' 
                : `There are no ${filterStatus} requests at the moment.`}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="table-header">
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-1" />
                      Applicant
                    </div>
                  </th>
                  <th className="table-header">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </div>
                  </th>
                  <th className="table-header">
                    <div className="flex items-center">
                      <Badge className="w-4 h-4 mr-1" />
                      Job Title
                    </div>
                  </th>
                  <th className="table-header">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      Submitted
                    </div>
                  </th>
                  <th className="table-header">Status</th>
                  <th className="table-header">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRequests.map((request) => (
                  <tr 
                    key={request.id} 
                    className="hover:bg-gray-50 transition-colors animate-fade-in"
                  >
                    <td className="table-cell">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
                          <span className="text-white text-sm font-medium">
                            {request.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">{request.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="table-cell">
                      <a 
                        href={`mailto:${request.email}`}
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        {request.email}
                      </a>
                    </td>
                    <td className="table-cell">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {request.jobTitle}
                      </span>
                    </td>
                    <td className="table-cell text-gray-500">
                      {formatDate(request.createdAt)}
                    </td>
                    <td className="table-cell">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="table-cell">
                      {request.status === 'pending' ? (
                        <button
                          onClick={() => acceptRequest(request.id)}
                          disabled={loading.accept === request.id}
                          className="btn-success flex items-center space-x-1 text-sm"
                        >
                          {loading.accept === request.id ? (
                            <>
                              <div className="loading-spinner" />
                              <span>Accepting...</span>
                            </>
                          ) : (
                            <>
                              <UserCheck className="w-4 h-4" />
                              <span>Accept</span>
                            </>
                          )}
                        </button>
                      ) : (
                        <div className="flex items-center text-green-600 text-sm">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          <span>Accepted</span>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Real-time Status */}
      <div className="card">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-700">
              Real-time updates enabled
            </span>
          </div>
          <div className="text-xs text-gray-500">
            New requests will appear automatically
          </div>
        </div>
      </div>
    </div>
  );
}