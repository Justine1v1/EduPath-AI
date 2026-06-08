import express from 'express';
import Case from '../models/Case.js';
import User from '../models/User.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Helper to get user from token
const getUserFromToken = async (token) => {
  if (!token) return null;
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString());
    return await User.findById(payload.userId);
  } catch {
    return null;
  }
};

// Create new case
router.post('/', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const user = await getUserFromToken(token);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const { university, course, jamb, oLevel } = req.body;

    if (!university || !course || !jamb) {
      return res.status(400).json({
        success: false,
        message: 'Please provide university, course, and JAMB score',
      });
    }

    // Create case
    const newCase = await Case.create({
      caseId: `ADM-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      student: user._id,
      university,
      course,
      jamb: {
        score: jamb,
      },
      oLevel: oLevel || {},
      status: 'new',
      timeline: [
        {
          event: 'Application created',
          status: 'new',
          timestamp: new Date(),
          changedBy: user._id,
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: 'Case created successfully',
      data: newCase,
    });
  } catch (error) {
    console.error('Create case error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create case',
      error: error.message,
    });
  }
});

// Get user's cases
router.get('/', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const user = await getUserFromToken(token);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const cases = await Case.find({ student: user._id })
      .populate('university', 'name abbreviation')
      .populate('course', 'name code')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: cases.length,
      data: cases,
    });
  } catch (error) {
    console.error('Get cases error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch cases',
      error: error.message,
    });
  }
});

// Get case details
router.get('/:id', async (req, res) => {
  try {
    const caseData = await Case.findById(req.params.id)
      .populate('student', 'firstName lastName email phone')
      .populate('university', 'name abbreviation location')
      .populate('course', 'name code category')
      .populate('timeline.changedBy', 'firstName lastName email');

    if (!caseData) {
      return res.status(404).json({
        success: false,
        message: 'Case not found',
      });
    }

    res.json({
      success: true,
      data: caseData,
    });
  } catch (error) {
    console.error('Get case error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch case',
      error: error.message,
    });
  }
});

// Update case status
router.put('/:id/status', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const user = await getUserFromToken(token);

    if (!user || user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const { status, notes } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Please provide new status',
      });
    }

    const caseData = await Case.findById(req.params.id);

    if (!caseData) {
      return res.status(404).json({
        success: false,
        message: 'Case not found',
      });
    }

    // Update status
    await caseData.updateStatus(status, notes, user._id);

    res.json({
      success: true,
      message: 'Case status updated',
      data: caseData,
    });
  } catch (error) {
    console.error('Update case status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update case status',
      error: error.message,
    });
  }
});

// Add document to case
router.post('/:id/documents', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const user = await getUserFromToken(token);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const { type, url } = req.body;

    if (!type || !url) {
      return res.status(400).json({
        success: false,
        message: 'Please provide document type and URL',
      });
    }

    const caseData = await Case.findById(req.params.id);

    if (!caseData) {
      return res.status(404).json({
        success: false,
        message: 'Case not found',
      });
    }

    // Add document
    await caseData.addDocument({
      type,
      url,
      uploadedAt: new Date(),
      status: 'pending',
    });

    res.json({
      success: true,
      message: 'Document added successfully',
      data: caseData,
    });
  } catch (error) {
    console.error('Add document error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add document',
      error: error.message,
    });
  }
});

// Add note to case
router.post('/:id/notes', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    const user = await getUserFromToken(token);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized',
      });
    }

    const { content } = req.body;

    if (!content) {
      return res.status(400).json({
        success: false,
        message: 'Please provide note content',
      });
    }

    const caseData = await Case.findById(req.params.id);

    if (!caseData) {
      return res.status(404).json({
        success: false,
        message: 'Case not found',
      });
    }

    // Add note
    caseData.notes.push({
      author: user._id,
      content,
      createdAt: new Date(),
    });

    await caseData.save();

    res.json({
      success: true,
      message: 'Note added successfully',
      data: caseData,
    });
  } catch (error) {
    console.error('Add note error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add note',
      error: error.message,
    });
  }
});

export default router;
