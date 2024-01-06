import { NextRequest, NextResponse } from 'next/server';
import User from '@/models/userModel';
import Concert from '@/models/concertModel';
import Artist from '@/models/artistModel';

export async function DELETE(request: NextRequest) {
    try {
      const data = await request.json();
      const userId = data.userId;
      const email = data.email;
  
      if (!userId) {
        return NextResponse.json(
          { success: false, error: 'Missing required parameters' },
          { status: 400 }
        );
      }
  
      const deletionResult = await User.deleteOne({ _id: userId });
  
      if (deletionResult.deletedCount === 0) {
        return NextResponse.json(
          { success: false, error: 'User not found' },
          { status: 404 }
        );
      }

      if (email) {
        const concerts = await Concert.find({concert_artist_email: email})

        const artist = await Artist.find({artist_email: email})

        await Concert.deleteMany({ concert_artist_email: email });

        await Artist.deleteOne({ artist_email: email})
        
        console.log(concerts)
        console.log(artist)
      }

      return NextResponse.json({
        success: true,
        message: 'User deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting user:', error);
      return NextResponse.json(
        { success: false, error: 'Error deleting user' },
        { status: 500 }
      );
    }
  }
  
