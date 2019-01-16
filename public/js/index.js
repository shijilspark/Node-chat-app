
      var socket = io();

      socket.on('connect',()=>{
        console.log('Connected to Server')
      //   // socket.emit('createEmail',{
      //   //   to: 'tuttu@gmail.com',
      //   //   text: 'Message from client front end',
      //   //   createdAt: 123
      //   // });
      //   // socket.emit('createMessage',{
      //     from: 'Client kuttan',
      //     text: 'Client sent message'
      //   });
      });

      socket.on('disconnect',()=>{
        console.log('Disconnected from Server')
      });
      // socket.on('newEmail', (email)=>{
      //   console.log('New Email',email)
      // });
      socket.on('newMessage',(message)=>{
        var formattedTime = moment(message.createdAt).format('h:mm a');
        var template = jQuery('#message-template').html()
        var html = Mustache.to_html(template,{
          text: message.text, 
          from: message.from,
          createdAt: formattedTime,
        });
        jQuery('#messages').append(html);



        // console.log('New Message',message);
        // var li = jQuery('<li></li>');
        // li.text(`${message.from} : ${message.text}`);
        // jQuery('#messages').append(li)


      })

      socket.on('newLocationMessage',(message)=>{
        var li = jQuery('<li></li>')
        var a = jQuery('<a target="_blank">My Current Location</a>')
        li.text(`${message.from}: `)
        a.attr('href',`${message.url}`)
        li.append(a)
        jQuery('#messages').append(li)
      })
      // socket.emit('createMessage',{
      //   from: 'Client Frank',
      //   text: 'Hi'
      // },(data)=>{
      //   console.log('Got it', data)
      // })

      jQuery('#message-form').on('submit',(e)=>{
        e.preventDefault();
        socket.emit('createMessage',{
          from: 'User',
          text: jQuery('[name=message]').val()
        }, ()=>{

        })
      })

      var  locationButton = jQuery('#send-location')
      locationButton.on('click', (e)=>{
        if(!navigator.geolocation){
          return alert('Geolocation disabled on your browser')
        }
        navigator.geolocation.getCurrentPosition((position)=>{
          socket.emit('createLocation',{
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          })
          console.log(position)

        },()=>{
          alert('Unable to fetch locations')
        })

      })
