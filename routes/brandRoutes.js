const express = require('express')
const router = express.Router()
// const adminMiddleware = require('../middleware/middleware')
const Brand = require('../models/brandModel')

router.post('/creation', async (req, res) => {
    // console.log(req.body)
    try {
        // const createBrand = req.body.eventName;
        // const eventDate = req.body.eventDate;
        // req.body.adminId = req.admin._id
        const newBrand = await Brand.create(req.body)
        console.log(newBrand);
        res.status(200).json({ success: true, message: newBrand })
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ success: false })
    }
})

router.get('/all-brands', async (req, res) => {
    try {
        // const adminId = req.admin._id
        // const allEvents = await Brand.find({ adminId })
        // console.log(allEvents)
        const allBrands = await Brand.find();
        res.status(200).json({ success: true, message: allBrands });
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ success: false })
    }
})

// router.get('/event-details/:eventName/:eventId', async (req, res) => {
//     const { eventId } = (req.params)
//     try {
//         const eventDetails = await Brand.findById(eventId)
//         console.log(eventDetails)
//         res.status(200).json({ success: true, message: eventDetails })
//     }
//     catch (err) {
//         console.log(err)
//         res.status(500).json({ success: false })
//     }
// })

// router.put('/edit-event-details/:eventName/:eventId', async (req, res) => {
//     const { eventId } = (req.params)
//     try {
//         const editedEventDetails = await Brand.findByIdAndUpdate(eventId, req.body)
//         console.log(editedEventDetails)
//         res.status(200).json({ success: true, message: eventDetails })
//         //we cannot find any product in database
//         if (!hotelBook) {
//             return res.status(404).json({ message: `cannot find any event with id ${id}` });
//         }
//     }
//     catch (err) {
//         console.log(err)
//         res.status(500).json({ success: false })
//     }
// })

// router.patch('/update-event-images/:eventId', async (req, res) => {
//     const { eventId } = req.params
//     const newArray = req.body

//     // console.log("eventId => ", eventId)
//     console.log(req.body)
//     try {
//         const patchImagesArr = await Brand.findByIdAndUpdate(eventId,
//             { eventImages: newArray },
//             { new: true }) // {new: true } added To return the updated document
//         if (!patchImagesArr) {
//             return res.status(404).json({ message: 'Item not found' });
//         }
//         console.log(patchImagesArr)
//         return res.json({ success: true, ...patchImagesArr });
//     }
//     catch (error) {
//         console.error('Error updating array:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// })

// router.patch('/update-video-links/:eventId', async (req, res) => {
//     const { eventId } = req.params
//     const newArray = req.body
//     console.log(newArray)
//     try {
//         const patchVideoLinkArr = await Brand.findByIdAndUpdate(eventId,
//             { eventVideoLinks: newArray },
//             { new: true }) // {new: true } added To return the updated document
//         if (!patchVideoLinkArr) {
//             return res.status(404).json({ message: 'Item not found' });
//         }
//         console.log(patchVideoLinkArr)
//         return res.json({ success: true, ...patchVideoLinkArr });
//     }
//     catch (error) {
//         console.error('Error updating array:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// })


// router.patch('/update-event-publish/:eventId', async (req, res) => {
//     const { eventId } = req.params
//     try {
//         const publishedEvent = await Brand.findByIdAndUpdate(eventId,
//             { published: true },
//             { new: true }) // {new: true } added To return the updated document
//         if (!publishedEvent) {
//             return res.status(404).json({ message: 'Item not found' });
//         }
//         console.log(publishedEvent)
//         return res.json({ success: true, ...publishedEvent });
//     }
//     catch (error) {
//         console.error('Error updating array:', error);
//         res.status(500).json({ message: 'Server error' });
//     }
// })

// // router.get("/get-video-links", async (req, res) => {
// //     eventVideoLinks = "facebook.com"
// //     try{
// //         const videoLinkArray = await Brand.find({"eventVideoLinks": {$exists: true}})
// //         res.send(videoLinkArray)
// //         console.log(videoLinkArray)
// //     }
// //     catch(err){
// //         console.log(err)
// //     }
// // })

// // router.get('/get-video-links/:eventId', async (req, res) => {
// //     const eventId = req.params
// //     try {
// //         const videoLinkArray = await Brand.findById(eventId);
// //         if (!videoLinkArray) {
// //             return res.status(404).json({ message: 'Item not found' });
// //         }
// //         console.log(videoLinkArray)
// //         return res.json({ success: true, ...videoLinkArray });
// //     }
// //     catch (error) {
// //         console.error('Error finding videoLinkArray:', error);
// //         res.status(500).json({ message: 'Server error' });
// //     }
// // })

module.exports = router;