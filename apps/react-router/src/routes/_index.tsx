import { Form } from 'react-router'

import { auth } from '@oguri/auth'
import { db } from '@oguri/db'
import { Button } from '@oguri/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@oguri/ui/card'
import { XIcon } from '@oguri/ui/icons'
import { Input } from '@oguri/ui/input'
import { Label } from '@oguri/ui/label'

import type { Route } from './+types/_index'

export const loader = async (_: Route.LoaderArgs) => {
  const orm = db.abstract

  const posts = await orm.findMany('posts', {
    join: (b) => b.user(),
  })
  return { posts }
}

export const action = async ({ request }: Route.ActionArgs) => {
  const orm = db.abstract

  const session = await auth(request)
  if (!session.user) throw new Error('Unauthorized')

  const method = request.method.toLowerCase()

  if (method === 'post') {
    const formData = await request.formData()
    await orm.create('posts', {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      userId: session.user.id,
    })
  } else if (method === 'delete') {
    const formData = await request.formData()
    const postId = formData.get('postId') as string
    await orm.deleteMany('posts', {
      where: (b) => b('id', '=', postId),
    })
  }
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const { posts } = loaderData

  return (
    <main className='container'>
      <Form method='post' className='grid gap-4'>
        <div id='title' className='grid gap-2'>
          <Label htmlFor='title'>Title</Label>
          <Input name='title' id='title' placeholder='Enter post title' />
        </div>

        <div id='content' className='grid gap-2'>
          <Label htmlFor='content'>Content</Label>
          <Input name='content' id='content' placeholder='Enter post content' />
        </div>

        <Button>Create Post</Button>
      </Form>

      <section className='mt-4'>
        {posts.map((post) => (
          <Card key={post.id} className='mb-2'>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>Posted by {post.user.name}</CardDescription>
              <CardAction>
                <Form method='delete'>
                  <input type='hidden' name='postId' value={post.id} />
                  <Button variant='destructive' size='icon'>
                    <XIcon />
                  </Button>
                </Form>
              </CardAction>
            </CardHeader>
            <CardContent>{post.content}</CardContent>
          </Card>
        ))}
      </section>
    </main>
  )
}
