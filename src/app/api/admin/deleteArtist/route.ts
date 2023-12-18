import { NextRequest, NextResponse } from 'next/server';
import Artist from '@/models/artistModel';
import Concert from '@/models/concertModel';

export async function DELETE(request: NextRequest) {
  try {
    const data = await request.json();
    const artistId = data.artistId;
    const email = data.artistEmail

    if (!artistId) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Find artist by artist_id and delete it
    const deletionResult = await Artist.deleteOne({ artist_id: artistId });

    if (deletionResult.deletedCount === 0) {
      return NextResponse.json(
        { success: false, error: ' Artist not found' },
        { status: 404 }
      );
    }

    if (email) {
      const concerts = await Concert.find({concert_artist_email: email})

      await Concert.deleteMany({ concert_artist_email: email });
      
      console.log(concerts)
    }

    return NextResponse.json({
      success: true,
      message: 'Artist and associated concerts were deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting artist:', error);
    return NextResponse.json(
      { success: false, error: 'Error deleting artist' },
      { status: 500 }
    );
  }
}


  
