import React from 'react'

import { Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react'

function Error404() {
  return (
    <div>
        <Alert
            status='warning'
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height='200px'
            >
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='lg'>
                Sanırım yanlış yerdesiniz.
            </AlertTitle>
            <AlertDescription maxWidth='sm'>
                Sitemizde böyle bir sayfa bulunmamakta, sol üstten logoya yada diğer nav linklerine tıklayarak başka sayfalara geçebilirsiniz.
            </AlertDescription>
        </Alert>
    </div>
  )
}

export default Error404