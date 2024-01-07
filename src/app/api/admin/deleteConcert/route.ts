import { NextRequest, NextResponse } from 'next/server';
import Concert from '@/models/concertModel';
import User from "@/models/userModel"


export async function DELETE(request: NextRequest) {
    try {
      const data = await request.json();
      const concertId = data.concertId;
      const concertArtistEmail = data.concertArtistEmail

      console.log(concertArtistEmail)
  
      if (!concertId) {
        return NextResponse.json(
          { success: false, error: 'Missing required parameters' },
          { status: 400 }
        );
      }

      if (concertArtistEmail) {
      const user = await User.findOne({email: concertArtistEmail})
      console.log("this is user" + user)

        await User.updateOne(
          { email: concertArtistEmail },
          { $pull: { concerts: { concert_id: concertId } } }
        );
    
      }

      const deletionResult = await Concert.deleteOne({ concert_id: concertId });
  
      if (deletionResult.deletedCount === 0) {
        return NextResponse.json(
          { success: false, error: ' Concert not found' },
          { status: 404 }
        );
      }
  
      return NextResponse.json({
        success: true,
        message: 'Concert deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting concert:', error);
      return NextResponse.json(
        { success: false, error: 'Error deleting concert' },
        { status: 500 }
      );
    }
  }
  
