import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },
  punchIn: {
    type: Date,
  },
  punchOut: {
    type: Date,
  },

  workHours: {
    type: Number,
    default: 0,
  },

  status: {
    type: String,
    enum: ['present', 'absent', 'leave'],
    default: 'absent',
  },
  leaveHours: { type: Number, default: 0 },
});

attendanceSchema.index({ userId: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model('Attendance', attendanceSchema);
export default Attendance;
